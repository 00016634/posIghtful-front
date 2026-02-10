import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as mock from './mock/mock-analytics.data';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  getAgentMetrics() { return of(mock.MOCK_AGENT_METRICS); }
  getSupervisorMetrics() { return of(mock.MOCK_SUPERVISOR_METRICS); }
  getManagerMetrics() { return of(mock.MOCK_MANAGER_METRICS); }
  getConversionChart() { return of(mock.MOCK_CONVERSION_CHART); }
  getRevenueTrend() { return of(mock.MOCK_REVENUE_TREND); }
  getPersonnelChart() { return of(mock.MOCK_PERSONNEL_CHART); }
  getConversionRateTrend() { return of(mock.MOCK_CONVERSION_RATE_TREND); }
  getSupervisorPerformance() { return of(mock.MOCK_SUPERVISOR_PERFORMANCE); }
  getTopAgents() { return of(mock.MOCK_TOP_AGENTS); }
  getPerformanceChart() { return of(mock.MOCK_PERFORMANCE_CHART); }
}
