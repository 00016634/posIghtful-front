import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, LabelComponent, BadgeComponent,
  DialogComponent, DialogHeaderComponent, DialogTitleComponent, DialogFooterComponent,
} from '../../shared/ui';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../shared/ui/toast.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    PageLayoutComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, LabelComponent, BadgeComponent,
    DialogComponent, DialogHeaderComponent, DialogTitleComponent, DialogFooterComponent,
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
              <h1 class="text-2xl font-semibold">Product Management</h1>
              <p class="text-sm text-muted-foreground">Manage your product catalog</p>
            </div>
          </div>
          <ui-button (click)="openDialog(null)">Add Product</ui-button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (product of products(); track product.id) {
            <ui-card className="hover:shadow-lg transition-shadow">
              <ui-card-header>
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <ui-card-title className="text-lg">{{ product.name }}</ui-card-title>
                    <ui-badge variant="outline" className="mt-2">{{ product.category }}</ui-badge>
                  </div>
                  <span [class]="'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ' + (product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')">
                    {{ product.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </ui-card-header>
              <ui-card-content>
                <p class="text-sm text-muted-foreground mb-4">{{ product.description }}</p>
                <div class="flex justify-between items-center">
                  <p class="text-xs text-muted-foreground">Added: {{ product.createdDate }}</p>
                  <div class="flex gap-2">
                    <ui-button variant="ghost" size="icon" (click)="openDialog(product)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </ui-button>
                    <ui-button variant="ghost" size="icon" (click)="deleteProduct(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-600"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </ui-button>
                  </div>
                </div>
              </ui-card-content>
            </ui-card>
          }
        </div>

        @if (products().length === 0) {
          <ui-card>
            <ui-card-content className="py-16 text-center">
              <p class="text-muted-foreground mb-4">No products found</p>
              <ui-button (click)="openDialog(null)">Add Your First Product</ui-button>
            </ui-card-content>
          </ui-card>
        }
      </div>

      <ui-dialog [open]="dialogOpen()" (openChange)="dialogOpen.set($event)">
        <ui-dialog-header>
          <ui-dialog-title>{{ editingProduct() ? 'Edit Product' : 'Add New Product' }}</ui-dialog-title>
        </ui-dialog-header>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <ui-label>Product Name *</ui-label>
            <input type="text" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" [value]="formData().name" (input)="updateFormField('name', $event)" placeholder="e.g., Premium Insurance" />
          </div>
          <div class="space-y-2">
            <ui-label>Description</ui-label>
            <textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" [value]="formData().description" (input)="updateFormField('description', $event)" placeholder="Describe the product..." rows="3"></textarea>
          </div>
          <div class="space-y-2">
            <ui-label>Category</ui-label>
            <input type="text" class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" [value]="formData().category" (input)="updateFormField('category', $event)" placeholder="e.g., Insurance" />
          </div>
        </div>
        <ui-dialog-footer>
          <ui-button variant="outline" (click)="dialogOpen.set(false)">Cancel</ui-button>
          <ui-button (click)="saveProduct()">{{ editingProduct() ? 'Update' : 'Create' }}</ui-button>
        </ui-dialog-footer>
      </ui-dialog>
    </app-page-layout>
  `,
})
export class ProductManagementComponent implements OnInit {
  router = inject(Router);
  private productService = inject(ProductService);
  private toastService = inject(ToastService);
  products = signal<any[]>([]);
  dialogOpen = signal(false);
  editingProduct = signal<any>(null);
  formData = signal({ name: '', description: '', category: 'Insurance' });

  ngOnInit() { this.loadProducts(); }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description ?? '',
          category: p.category ?? '',
          isActive: p.is_active,
          createdDate: p.created_at
            ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '',
        })));
      },
      error: () => this.toastService.show('Error', 'Failed to load products', 'destructive'),
    });
  }

  updateFormField(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.formData.update(f => ({ ...f, [field]: value }));
  }

  openDialog(product: any) {
    this.editingProduct.set(product);
    this.formData.set(product
      ? { name: product.name, description: product.description, category: product.category }
      : { name: '', description: '', category: 'Insurance' });
    this.dialogOpen.set(true);
  }

  saveProduct() {
    const f = this.formData();
    if (!f.name) { this.toastService.show('Error', 'Product name is required', 'destructive'); return; }
    const payload = { name: f.name, category: f.category || '' };
    const e = this.editingProduct();
    if (e) {
      this.productService.updateProduct(e.id, payload).subscribe({
        next: () => {
          this.toastService.show('Updated', 'Product updated successfully');
          this.dialogOpen.set(false);
          this.loadProducts();
        },
        error: () => this.toastService.show('Error', 'Failed to update product', 'destructive'),
      });
    } else {
      this.productService.createProduct(payload).subscribe({
        next: () => {
          this.toastService.show('Created', 'Product created successfully');
          this.dialogOpen.set(false);
          this.loadProducts();
        },
        error: () => this.toastService.show('Error', 'Failed to create product', 'destructive'),
      });
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toastService.show('Deleted', 'Product deleted successfully');
        this.loadProducts();
      },
      error: () => this.toastService.show('Error', 'Failed to delete product', 'destructive'),
    });
  }
}
