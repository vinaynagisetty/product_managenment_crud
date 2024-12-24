import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ProductFormComponent } from './app/components/product-form/product-form.component';
import { ProductListComponent } from './app/components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductFormComponent, ProductListComponent],
  template: `
    <div class="app-container">
      <h1>Product Management System</h1>
      <app-product-form></app-product-form>
      <app-product-list></app-product-list>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class App {
  name = 'Product CRUD';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});