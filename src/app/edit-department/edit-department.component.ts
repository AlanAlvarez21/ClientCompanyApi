import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent {
  department: any = {}; // Define la estructura de tu objeto de usuario
  companyId: any;
  departmentId: any;
  leader: any = {};
  employees: any[] = [];
  private apiEndpoint = 'http://localhost:8080/api/departments';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('companyId');
      this.departmentId = params.get('departmentId');
      this.getEmployeesData(); // Cargar los datos de líderes y empleados al inicio
    });

    console.log('company ID', this.companyId)
    console.log('department ID', this.departmentId)
    
    this.http.get(`${this.apiEndpoint}/${this.departmentId}`).subscribe(
      (data: any) => {
        this.department = data;
        console.log(data)
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos de la compañía', error);
      }
    );
  }


  departments: any[] = [];

  deleteEmployee(employeeId: string, is_current_leader: boolean): void {
    const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/employees/${employeeId}`;
    this.http.delete(apiUrl).subscribe(() => {
      this.employees = this.employees.filter(employee => employee._id !== employeeId);
    });

    if (is_current_leader) {
      // Espera medio segundo (500 milisegundos) antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  getEmployeesData(): void {
    if (this.departmentId) {
      const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/departments/${this.departmentId}/employees-leaders`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.leader = data.leader;
        this.employees = data.employees;
      });
    }
  }

  backToDepartment(){  
    this.router.navigate(['/departments', this.companyId]);
  }

  openAddUserModal(type: boolean) {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      data: {
        companyId: this.companyId, // Pasa companyID
        departmentId: this.departmentId, // Pasa companyID
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


  updateDepartment() {
    console.log('hola')
  //   // Verificar que los campos no estén vacíos
  }
}
