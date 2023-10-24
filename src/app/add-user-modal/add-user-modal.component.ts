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
  departmentId: string; // Propiedad para almacenar companyID
  type: boolean;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyId = data.companyId; // Obtén companyID de las propiedades
    this.departmentId = data.departmentId; // Obtén companyID de las propiedades
    this.type = data.type; // Obtén el tipo de usuario de las propiedades
  }

  addUser(): void {
    console.log('company ID', this.companyId);
    console.log('department ID', this.departmentId);
    console.log('Lider?', this.type)

    const employeesEndpoint = 'http://localhost:8080/api/employees'; // Endpoint para agregar un empleado
    const departmentsEndpoint = `http://localhost:8080/api/departments/${this.departmentId}`;


    const userToAdd: any = {
      name: this.newUser.username,
      department: this.departmentId,
      company: this.companyId,
      is_current_leader: this.type,// Verifica el tipo para establecer is_current_leader
    };
    
    this.http.post(employeesEndpoint, userToAdd).subscribe(
      (data: any) => {
        console.log('User added successfully', data);
        console.log('ID de User', data.employeeId);
        const departmentsEndpoint = `http://localhost:8080/api/departments/${this.departmentId}`;
        
        // Obtener la lista actual de empleados del departamento
        this.http.get(departmentsEndpoint).subscribe(
          (departmentData: any) => {
            const currentEmployees = departmentData.employees || [];
            
            // Agregar el nuevo empleado a la lista actual
            currentEmployees.push(data.employeeId);
            const putData = this.type ? { leader: data.employeeId } : { employees: currentEmployees };

            // Realizar una solicitud PUT para actualizar la lista de empleados en el departamento
            this.http.put(departmentsEndpoint, putData).subscribe(
              (updatedDepartmentData: any) => {
                console.log('DEPARTMENT updated successfully', updatedDepartmentData);
                this.dialogRef.close(data);
                window.location.reload();
              },
              (departmentError: HttpErrorResponse) => {
                console.error('Error updating Department', departmentError);
                // Maneja los errores aquí
              }
            );
          },
          (departmentError: HttpErrorResponse) => {
            console.error('Error fetching Department', departmentError);
            // Maneja los errores aquí
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding User', error);
        // Maneja los errores aquí
      }
    );
    
}
}
