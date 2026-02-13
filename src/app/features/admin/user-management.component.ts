import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, LabelComponent, AvatarComponent,
  TableComponent, TableHeaderComponent, TableBodyComponent,
  TableRowComponent, TableHeadComponent, TableCellComponent,
} from '../../shared/ui';
import { UserManagementService } from '../../services/user-management.service';
import { ToastService } from '../../shared/ui/toast.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    FormsModule, PageLayoutComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, LabelComponent, AvatarComponent,
    TableComponent, TableHeaderComponent, TableBodyComponent,
    TableRowComponent, TableHeadComponent, TableCellComponent,
  ],
  template: `
    <app-page-layout>
      <div class="mx-auto max-w-7xl space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <ui-button variant="ghost" size="icon" (click)="router.navigateByUrl('/admin')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </ui-button>
            <div>
              <h1 class="text-2xl font-semibold">User Management</h1>
              <p class="text-sm text-muted-foreground">Manage all system users and their roles</p>
            </div>
          </div>
          <ui-button (click)="router.navigateByUrl('/admin/users/new')">Add User</ui-button>
        </div>

        <ui-card>
          <ui-card-header><ui-card-title>Filters</ui-card-title></ui-card-header>
          <ui-card-content>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="space-y-2">
                <ui-label>Search</ui-label>
                <input type="text" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Search by name, email..." [(ngModel)]="searchTerm" />
              </div>
              <div class="space-y-2">
                <ui-label>Role</ui-label>
                <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" [(ngModel)]="filterRole">
                  <option value="all">All Roles</option>
                  <option value="agent">Agent</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="manager">Manager</option>
                  <option value="accountant">Accountant</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="space-y-2">
                <ui-label>Status</ui-label>
                <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" [(ngModel)]="filterStatus">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header><ui-card-title>Users ({{ filteredUsers().length }})</ui-card-title></ui-card-header>
          <ui-card-content>
            <ui-table>
              <ui-table-header>
                <ui-table-row>
                  <ui-table-head>User</ui-table-head>
                  <ui-table-head>Email</ui-table-head>
                  <ui-table-head>Role</ui-table-head>
                  <ui-table-head>Region</ui-table-head>
                  <ui-table-head>Status</ui-table-head>
                  <ui-table-head className="text-right">Actions</ui-table-head>
                </ui-table-row>
              </ui-table-header>
              <ui-table-body>
                @for (user of filteredUsers(); track user.id) {
                  <ui-table-row>
                    <ui-table-cell>
                      <div class="flex items-center gap-3">
                        <ui-avatar [fallback]="initials(user.fullName)" />
                        <div>
                          <p class="font-medium">{{ user.fullName }}</p>
                          <p class="text-sm text-muted-foreground">{{ user.userCode }}</p>
                        </div>
                      </div>
                    </ui-table-cell>
                    <ui-table-cell className="text-sm">{{ user.email }}</ui-table-cell>
                    <ui-table-cell>
                      <span [class]="'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ' + roleBadge(user.role)">{{ user.role }}</span>
                    </ui-table-cell>
                    <ui-table-cell className="text-sm">{{ user.region }}</ui-table-cell>
                    <ui-table-cell>
                      <span [class]="'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ' + (user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')">{{ user.status }}</span>
                    </ui-table-cell>
                    <ui-table-cell className="text-right">
                      <div class="flex justify-end gap-2">
                        <ui-button variant="ghost" size="icon" (click)="router.navigateByUrl('/admin/users/' + user.id)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </ui-button>
                        <ui-button variant="ghost" size="icon" (click)="deleteUser(user.id)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-600"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </ui-button>
                      </div>
                    </ui-table-cell>
                  </ui-table-row>
                } @empty {
                  <ui-table-row>
                    <ui-table-cell className="text-center py-8 text-muted-foreground" colSpan="6">No users found</ui-table-cell>
                  </ui-table-row>
                }
              </ui-table-body>
            </ui-table>
          </ui-card-content>
        </ui-card>
      </div>
    </app-page-layout>
  `,
})
export class UserManagementComponent implements OnInit {
  router = inject(Router);
  private userService = inject(UserManagementService);
  private toastService = inject(ToastService);
  users = signal<any[]>([]);
  searchTerm = '';
  filterRole = 'all';
  filterStatus = 'all';
  filteredUsers = computed(() => this.users().filter(u => {
    const s = !this.searchTerm || u.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
    const r = this.filterRole === 'all' || u.role === this.filterRole;
    const st = this.filterStatus === 'all' || u.status === this.filterStatus;
    return s && r && st;
  }));
  ngOnInit() { this.userService.getUsers().subscribe(d => this.users.set(d)); }
  deleteUser(id: number) { this.users.update(u => u.filter(x => x.id !== id)); this.toastService.show('Deleted', 'User deleted successfully'); }
  initials(name: string) { return name.split(' ').map(n => n[0]).join(''); }
  roleBadge(role: string) {
    const c: Record<string, string> = { agent: 'bg-blue-100 text-blue-800', supervisor: 'bg-purple-100 text-purple-800', manager: 'bg-green-100 text-green-800', accountant: 'bg-orange-100 text-orange-800', admin: 'bg-red-100 text-red-800' };
    return c[role] || 'bg-gray-100 text-gray-800';
  }
}
