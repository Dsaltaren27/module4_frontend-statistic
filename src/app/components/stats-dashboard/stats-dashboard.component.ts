import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-dashboard.component.html',
})
export class StatsDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('trafficChart') trafficChartCanvas!: ElementRef<HTMLCanvasElement>;
  
  searchCode: string = 'ec61ff'; 
  statsData: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  chartInstance: any = null; 

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  async fetchStatistics(): Promise<void> {
    if (!this.searchCode.trim()) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.statsData = null;
    this.destroyChart();

    try {
      this.statsData = await this.statsService.getStatsByCode(this.searchCode);
      setTimeout(() => this.renderChart(), 60);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        this.errorMessage = 'El código corto consultado no existe en la base de datos de DynamoDB.';
      } else {
        this.errorMessage = 'Error de comunicación. No se pudo conectar con el servidor de AWS.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  renderChart(): void {
    if (!this.trafficChartCanvas || !this.statsData) return;

    const days = Object.keys(this.statsData.clicksByDay);
    const clickCounts = Object.values(this.statsData.clicksByDay);

    const ctx = this.trafficChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Visitas Diarias',
          data: clickCounts,
          backgroundColor: 'rgba(99, 102, 241, 0.2)', 
          borderColor: '#6366f1',                      
          borderWidth: 2,
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(139, 92, 246, 0.4)', 
          hoverBorderColor: '#8b5cf6',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  destroyChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}