// Import necessary modules and services
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
}
