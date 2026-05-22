import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private apiUrl = 'https://modulo1.execute-api.us-east-1.amazonaws.com';

  async getStatsByCode(code: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/stats/${code.trim()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}