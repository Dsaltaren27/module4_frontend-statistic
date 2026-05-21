import { Component } from '@angular/core';
import { StatsDashboardComponent } from './components/stats-dashboard/stats-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StatsDashboardComponent],
  template: '<app-stats-dashboard></app-stats-dashboard>',
})
export class AppComponent {}