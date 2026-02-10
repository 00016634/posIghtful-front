import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MOCK_BONUS_RULES, MOCK_MONTHLY_BONUSES, MOCK_MONTHLY_DETAIL, MOCK_ATTRIBUTION_POLICY } from './mock/mock-bonus.data';

@Injectable({ providedIn: 'root' })
export class BonusService {
  getBonusRules() { return of(MOCK_BONUS_RULES); }
  getMonthlyBonuses() { return of(MOCK_MONTHLY_BONUSES); }
  getMonthlyDetail(month: string) { return of(MOCK_MONTHLY_DETAIL); }
  getAttributionPolicy() { return of(MOCK_ATTRIBUTION_POLICY); }
  updateRule(id: number, data: any) { return of({ id, ...data }); }
  updateAttributionPolicy(data: any) { return of(data); }
}
