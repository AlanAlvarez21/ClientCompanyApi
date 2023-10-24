import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  newDepartment: any = {};
  companyId: any;
  errorAddingUser: string | null = null; // Variable para almacenar el mensaje de error

  

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  companyID(){
    const url = window.location.href;
    const parts = url.split('/');
    const companyId = parts[parts.length - 1];
    console.log('Company ID:', companyId);
    return companyId
  }

  openAddUserModal(type: string) {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      data: {
        companyId: this.companyID(), // Pasa companyID
        type: type, // Pasa el tipo de usuario
      },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // El usuario agregado se encuentra en `result`. Puedes manejarlo aquí.
        console.log(type);
      }
    });
  }


  addDepartment() {
    this.newDepartment.company = this.companyID()
    this.http.post('https://api-company-3bbf1b72d2c9.herokuapp.com/api/departments', this.newDepartment).subscribe(
      (data: any) => {
        console.log('Department added successfully', data);

        window.alert('Departamento Creado');

        this.newDepartment = {}; 
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding Department', error);

        if (error.status === 400) {
          // El servidor respondió con un código 400 (Bad Request)
          this.errorAddingUser = error.error.error;
          window.alert('Error añadiendo Departamento: ' + this.errorAddingUser);
        } else {
          // Otro tipo de error
          this.errorAddingUser = 'Ocurrió un error al agregar Departamento';
          window.alert('Error añadiendo Departamento: ' + this.errorAddingUser);
        }
        
      }
      
    );
  }

  backToDepartment(){  
    this.router.navigate(['/departments', this.companyID()]);
  }
}
