import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  newUser: any = {};
  companyId: string; // Propiedad para almacenar companyID
  userType: string = 'Leader' || 'Employee'; // O 'Employee', según corresponda

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyId = data.companyId; // Obtén companyID de las propiedades
    this.userType = data.type; // Obtén el tipo de usuario de las propiedades
  }

  addUser(): void {
    const endpoint = `http://localhost:8080/api/departments/${this.companyId}`;
  
    const userToAdd: { [key: string]: any } = {
      employees: null,
      company: this.companyId,
      leader: null
    };
  
    if (this.userType === 'Leader') {
      userToAdd['is_current_leader'] = true;
      userToAdd['leader'] = true;
    } else if (this.userType === 'Employee') {
      userToAdd['is_current_leader'] = false;
    }

    if (this.userType === 'Leader') {
    } else if (this.userType === 'Employee') {
    }
  
    this.http.put(endpoint, userToAdd).subscribe(
      (data: any) => {
        console.log('User added successfully', data);
        this.dialogRef.close(data);
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding User', error);
        // Maneja los errores aquí
      }
    );
  }
  
}
