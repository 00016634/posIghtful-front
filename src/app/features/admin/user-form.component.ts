import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, LabelComponent, SwitchComponent,
} from '../../shared/ui';
import { ToastService } from '../../shared/ui/toast.service';
import { RegionService, Region } from '../../services/region.service';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, PageLayoutComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, LabelComponent, SwitchComponent,
  ],
  template: `
    <app-page-layout>
      <div class="mx-auto max-w-4xl space-y-6">
        <div class="flex items-center gap-4">
          <ui-button variant="ghost" size="icon" (click)="router.navigateByUrl('/admin/users')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </ui-button>
          <div>
            <h1 class="text-2xl font-semibold">{{ isEditMode ? 'Edit User' : 'Create New User' }}</h1>
            <p class="text-sm text-muted-foreground">{{ isEditMode ? 'Update user information and role' : 'Add a new user to the system' }}</p>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <ui-card>
            <ui-card-header><ui-card-title>User Information</ui-card-title></ui-card-header>
            <ui-card-content className="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 space-y-2">
                  <ui-label>Full Name *</ui-label>
                  <input type="text" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" formControlName="fullName" placeholder="e.g., John Smith" />
                </div>
                <div class="space-y-2">
                  <ui-label>Email *</ui-label>
                  <input type="email" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" formControlName="email" placeholder="e.g., john&#64;company.com" />
                </div>
                <div class="space-y-2">
                  <ui-label>Phone</ui-label>
                  <input type="tel" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" formControlName="phone" placeholder="+998 XX XXX XX XX" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <ui-label>Role *</ui-label>
                  <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" formControlName="role">
                    <option value="agent">Agent</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="manager">Manager</option>
                    <option value="accountant">Accountant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <ui-label>Region</ui-label>
                  <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" formControlName="region">
                    <option value="">Select region</option>
                    @for (region of regions(); track region.id) {
                      <option [value]="region.id">{{ region.name }}</option>
                    }
                  </select>
                  @if (regions().length === 0) {
                    <p class="text-xs text-muted-foreground">
                      No regions found.
                      <a class="text-primary underline cursor-pointer" (click)="router.navigateByUrl('/admin/regions')">Add regions</a>
                    </p>
                  }
                </div>
              </div>
              <div class="space-y-2">
                <ui-label>Hire Date</ui-label>
                <input type="date" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" formControlName="hireDate" />
              </div>
              @if (!isEditMode) {
                <div class="border-t pt-6">
                  <h3 class="font-semibold mb-4">Security</h3>
                  <div class="space-y-2">
                    <ui-label>Password *</ui-label>
                    <input type="password" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" formControlName="password" placeholder="Create a secure password" />
                    <p class="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                  </div>
                </div>
              }
              @if (isEditMode) {
                <div class="border-t pt-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <ui-label>Account Status</ui-label>
                      <p class="text-sm text-muted-foreground">Inactive users cannot log in</p>
                    </div>
                    <div class="flex items-center space-x-2">
                      <ui-switch [checked]="form.get('isActive')?.value" (checkedChange)="form.get('isActive')?.setValue($event)" />
                      <span class="text-sm">{{ form.get('isActive')?.value ? 'Active' : 'Inactive' }}</span>
                    </div>
                  </div>
                </div>
              }
              <div class="flex justify-end gap-2 pt-4">
                <ui-button type="button" variant="outline" (click)="router.navigateByUrl('/admin/users')">Cancel</ui-button>
                <ui-button type="submit">{{ isEditMode ? 'Update User' : 'Create User' }}</ui-button>
              </div>
            </ui-card-content>
          </ui-card>
        </form>
      </div>
    </app-page-layout>
  `,
})
export class UserFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private regionService = inject(RegionService);
  private userService = inject(UserManagementService);

  isEditMode = false;
  userId: string | null = null;
  form!: FormGroup;
  regions = signal<Region[]>([]);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.isEditMode = !!this.userId && this.userId !== 'new';

    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['agent', Validators.required],
      region: [''],
      hireDate: [''],
      password: [''],
      isActive: [true],
    });

    this.regionService.getRegions().subscribe({
      next: (data) => this.regions.set(data),
    });

    if (this.isEditMode && this.userId) {
      this.userService.getUserById(+this.userId).subscribe({
        next: (user) => {
          this.form.patchValue({
            fullName: user.full_name,
            email: user.email,
            phone: user.phone_number || '',
            role: user.roles?.[0]?.toLowerCase() || 'agent',
            region: user.region || '',
            hireDate: user.hire_date || '',
            isActive: user.is_active,
          });
        },
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastService.show('Error', 'Please fill required fields', 'destructive');
      return;
    }

    const val = this.form.value;
    const payload: any = {
      full_name: val.fullName,
      email: val.email,
      phone_number: val.phone || '',
      role: val.role,
    };

    if (this.isEditMode && this.userId) {
      payload.is_active = val.isActive;
      this.userService.updateUser(+this.userId, payload).subscribe({
        next: () => {
          this.toastService.show('Updated', 'User updated successfully');
          this.router.navigateByUrl('/admin/users');
        },
        error: () => this.toastService.show('Error', 'Failed to update user', 'destructive'),
      });
    } else {
      if (val.password) payload.password = val.password;
      this.userService.createUser(payload).subscribe({
        next: () => {
          this.toastService.show('Created', 'User created successfully');
          this.router.navigateByUrl('/admin/users');
        },
        error: () => this.toastService.show('Error', 'Failed to create user', 'destructive'),
      });
    }
  }
}
