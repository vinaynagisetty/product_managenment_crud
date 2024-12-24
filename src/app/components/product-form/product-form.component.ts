import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { validatePrice } from '../../shared/utils/price.utils';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ state.editing ? 'Edit Product' : 'Add Product' }}</h2>
      <form (ngSubmit)="onSubmit()" #productForm="ngForm">
        <div class="form-group">
          <label for="id">ID:</label>
          <input
            type="number"
            class="form-control"
            id="id"
            [(ngModel)]="state.product.id"
            name="id"
            required
          />
        </div>

        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            [(ngModel)]="state.product.name"
            name="name"
            required
            minlength="2"
          />
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input
            type="number"
            class="form-control"
            id="price"
            [(ngModel)]="state.product.price"
            name="price"
            required
            min="0"
            step="0.01"
            (change)="validateProductPrice()"
          />
          <small class="error-text" *ngIf="priceError">
            Price must be a valid positive number
          </small>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="!productForm.form.valid || priceError">
          {{ state.editing ? 'Update' : 'Add' }} Product
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .error-text {
      color: red;
      font-size: 0.8em;
    }
  `]
})
export class ProductFormComponent {
  @Input() initialProduct?: Product;
  @Output() submitSuccess = new EventEmitter<void>();

  state = {
    product: {
      id: 0,
      name: '',
      price: 0
    },
    editing: false
  };

  priceError = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.initialProduct) {
      this.state = {
        product: { ...this.initialProduct },
        editing: true
      };
    }
  }

  validateProductPrice(): void {
    this.priceError = !validatePrice(this.state.product.price);
  }

  onSubmit(): void {
    if (this.priceError) return;

    const request$ = this.state.editing
      ? this.productService.updateProduct(this.state.product.id, this.state.product)
      : this.productService.createProduct(this.state.product);

    request$.subscribe(() => {
      this.resetForm();
      this.submitSuccess.emit();
    });
  }

  private resetForm(): void {
    this.state = {
      product: {
        id: 0,
        name: '',
        price: 0
      },
      editing: false
    };
    this.priceError = false;
  }
}