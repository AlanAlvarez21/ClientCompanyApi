import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newCompany: any = {};
  errorAddingUser: string | null = null; // Variable para almacenar el mensaje de error

  constructor(private http: HttpClient) { }

  addUser() {
    this.http.post('https://api-company-3bbf1b72d2c9.herokuapp.com/api/companies', this.newCompany).subscribe(
      (data: any) => {
        console.log('Company added successfully', data);

        window.alert('Compañía Creada');

        this.newCompany = {}; 
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding Company', error);

        if (error.status === 400) {
          // El servidor respondió con un código 400 (Bad Request)
          this.errorAddingUser = error.error.error;
          window.alert('Error añadiendo usuario: ' + this.errorAddingUser);
        } else {
          // Otro tipo de error
          this.errorAddingUser = 'Ocurrió un error al agregar la compañía';
          window.alert('Error añadiendo compañía: ' + this.errorAddingUser);
        }
        
      }
      
    );
  }
}
