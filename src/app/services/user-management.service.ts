import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MOCK_USERS, MOCK_ADMIN_STATS, MOCK_RECENT_ACTIVITY, MOCK_ACCOUNTANT_DATA } from './mock/mock-user.data';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  getUsers() { return of(MOCK_USERS); }
  getUserById(id: number) { return of(MOCK_USERS.find(u => u.id === id)); }
  createUser(user: any) { return of({ ...user, id: Math.floor(100 + Math.random() * 900) }); }
  updateUser(id: number, data: any) { return of({ id, ...data }); }
  deleteUser(id: number) { return of(true); }
  getAdminStats() { return of(MOCK_ADMIN_STATS); }
  getRecentActivity() { return of(MOCK_RECENT_ACTIVITY); }
  getAccountantData() { return of(MOCK_ACCOUNTANT_DATA); }
}
