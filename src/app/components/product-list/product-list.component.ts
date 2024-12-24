import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { formatPrice } from '../../shared/utils/price.utils';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
    <div class="container">
      <h2>Products List</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>
              <button class="btn btn-edit" (click)="editProduct(product)">Edit</button>
              <button class="btn btn-delete" (click)="deleteProduct(product.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="products.length === 0">
            <td colspan="4" class="text-center">No products available</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th, .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .text-center {
      text-align: center;
    }
    .btn-edit {
      margin-right: 8px;
      background-color: #ffc107;
    }
    .btn-delete {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  formatPrice = formatPrice;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id)
        .subscribe(() => this.loadProducts());
    }
  }

  editProduct(product: Product): void {
    // Implementation for edit functionality
    console.log('Editing product:', product);
  }
}