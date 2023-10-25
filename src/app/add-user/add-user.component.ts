import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newCompany: any = {};
  errorAddingUser: string | null = null; // Variable para almacenar el mensaje de error

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  addUser() {
    this.http.post('https://api-company-3bbf1b72d2c9.herokuapp.com/api/companies', this.newCompany).subscribe(
      (data: any) => {
        console.log('Company added successfully', data);

        window.alert('Compañía Creada');

        this.newCompany = {}; 
        this.router.navigate(['/companies']);

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
