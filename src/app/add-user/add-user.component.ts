import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser: any = {}; // Object to store user data

  constructor(private http: HttpClient) { }

  addUser() {
    this.http.post('http://localhost:8000/usuarios', this.newUser).subscribe((data: any) => {
      console.log('User added successfully', data);
      // Clear the form or perform any other necessary actions
    });
  }
}
