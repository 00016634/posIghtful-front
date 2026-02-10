import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_AGENTS, MOCK_SUPERVISORS, MOCK_AGENT_PROFILE, MOCK_SUPERVISOR_PROFILE } from './mock/mock-agent.data';

@Injectable({ providedIn: 'root' })
export class AgentService {
  getAgents() { return of(MOCK_AGENTS); }
  getSupervisors() { return of(MOCK_SUPERVISORS); }
  getAllPersonnel() { return of([...MOCK_SUPERVISORS, ...MOCK_AGENTS]); }
  getAgentById(id: number) { return of([...MOCK_AGENTS, ...MOCK_SUPERVISORS].find(a => a.id === id)); }
  getAgentProfile() { return of(MOCK_AGENT_PROFILE); }
  getSupervisorProfile() { return of(MOCK_SUPERVISOR_PROFILE); }
}
