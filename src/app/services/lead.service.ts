import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_LEADS } from './mock/mock-lead.data';

@Injectable({ providedIn: 'root' })
export class LeadService {
  getLeads() { return of(MOCK_LEADS); }
  getLeadById(id: string) { return of(MOCK_LEADS.find(l => l.id === id)); }
  createLead(lead: any) { return of({ ...lead, id: 'LD-' + Math.floor(10000 + Math.random() * 90000) }); }
  updateLead(id: string, data: any) { return of({ id, ...data }); }
  deleteLead(id: string) { return of(true); }
}
