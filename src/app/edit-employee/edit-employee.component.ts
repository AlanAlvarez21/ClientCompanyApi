import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  companyId: any;
  departmentId: any;
  employeeId: any;
  user: any = {};
  leaderName: string = '';
  departments: any[] = [];
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    company: new FormControl(''),
    department: new FormControl(''),
    leader: new FormControl(''),
  });
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('companyId');
      this.departmentId = params.get('departmentId');
      this.employeeId = params.get('id');
      this.employeeForm = new FormGroup({
        name: new FormControl(''),
        company: new FormControl(''),
        department: new FormControl(''),
        leader: new FormControl(''),
      });
    });

    this.http.get(`http://localhost:8080/api/employees/${this.employeeId}`).subscribe(
      (data: any) => {
        this.user = data.employee;
        this.departments = data.departments;
        if (data.leader.length > 0) {
          this.leaderName = data.leader[0].name;
        }
        this.initializeForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      name: new FormControl(this.user.name),
      company: new FormControl(this.user.company.name),
      department: new FormControl(this.user.department.name),
      leader: new FormControl(this.leaderName),
      // Otros campos aquí
    });
  }

  updateUser() {
    // Verificar que los campos no estén vacíos
    if (this.employeeForm.invalid) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Resto de tu lógica para enviar la solicitud PUT
    const updatedUserData = this.employeeForm.value;
    this.http.put(`http://localhost:8080/api/companies/${this.companyId}`, updatedUserData).subscribe(
      () => {
        console.log('Usuario actualizado con éxito');
        this.router.navigate(['/users']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

  backToUserList() {
    this.router.navigate(['/employees', this.departmentId, this.companyId]);
  }
}
