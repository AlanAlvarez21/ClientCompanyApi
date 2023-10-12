import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Array to store user data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Define the API URL you want to fetch data from
    const apiUrl = 'https://nodejs-users-api-v86xc.kinsta.app/usuarios';

    // Make an HTTP GET request to the API
    this.http.get(apiUrl).subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(userId: string): void {
    // Define the API URL for deleting a user by ID
    const apiUrl = `https://nodejs-users-api-v86xc.kinsta.app/usuarios/${userId}`;

    // Make an HTTP DELETE request to delete the user
    this.http.delete(apiUrl).subscribe(() => {
      // Remove the deleted user from the users array
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }
}
