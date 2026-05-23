import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  // URL real del API Gateway del Módulo 1
  private apiUrl = 'https://39xwa8n693.execute-api.us-east-1.amazonaws.com';

  async getStatsByCode(code: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/stats/${code.trim()}`);
    return response.data;
  }
}
