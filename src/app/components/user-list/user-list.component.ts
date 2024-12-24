import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <div class="container">
      <h2>Users List</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button class="btn btn-edit" (click)="editUser(user)">Edit</button>
              <button class="btn btn-delete" (click)="deleteUser(user.id!)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
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
    .btn {
      padding: 6px 12px;
      margin-right: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-edit {
      background-color: #ffc107;
    }
    .btn-delete {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id)
        .subscribe(() => this.loadUsers());
    }
  }

  editUser(user: User): void {
    // Implement edit logic
  }
}