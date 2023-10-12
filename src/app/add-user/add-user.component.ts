import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser: any = {};
  errorAddingUser: string | null = null; // Variable para almacenar el mensaje de error

  constructor(private http: HttpClient) { }

  addUser() {
    this.http.post('https://nodejs-users-api-v86xc.kinsta.app/usuarios', this.newUser).subscribe(
      (data: any) => {
        console.log('User added successfully', data);

        window.alert('Usuario Creado');

        this.newUser = {}; 
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding user', error);

        if (error.status === 400) {
          // El servidor respondió con un código 400 (Bad Request)
          this.errorAddingUser = error.error.error;
          window.alert('Error añadiendo usuario: ' + this.errorAddingUser);
        } else {
          // Otro tipo de error
          this.errorAddingUser = 'Ocurrió un error al agregar el usuario';
          window.alert('Error añadiendo usuario: ' + this.errorAddingUser);
        }
        
      }
      
    );
  }
}
