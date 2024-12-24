import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ editing ? 'Edit User' : 'Add User' }}</h2>
      <form (ngSubmit)="onSubmit()" #userForm="ngForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            [(ngModel)]="user.name"
            name="name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            [(ngModel)]="user.email"
            name="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            [(ngModel)]="user.phone"
            name="phone"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          {{ editing ? 'Update' : 'Add' }} User
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
    .form-control {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .btn {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover {
      background-color: #0056b3;
    }
  `]
})
export class UserFormComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    phone: ''
  };
  editing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editing) {
      this.userService.updateUser(this.user.id!, this.user)
        .subscribe(() => this.resetForm());
    } else {
      this.userService.createUser(this.user)
        .subscribe(() => this.resetForm());
    }
  }

  resetForm(): void {
    this.user = {
      name: '',
      email: '',
      phone: ''
    };
    this.editing = false;
  }
}