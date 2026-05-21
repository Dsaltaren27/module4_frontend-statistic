import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private apiUrl = 'https://39xwa8n693.execute-api.us-east-1.amazonaws.com/stats';

  async getStatsByCode(code: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${code.trim()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}