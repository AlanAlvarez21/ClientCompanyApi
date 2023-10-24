import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  leader: any = {};
  employees: any[] = [];
  departmentId: string | null = null;
  companyId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('companyId');
      this.departmentId = params.get('departmentId');
      this.getEmployeesData();
    });
  }

  getEmployeesData(): void {
    if (this.departmentId) {
      const apiUrl = `http://localhost:8080/api/departments/${this.departmentId}/employees-leaders`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.leader = data.leader;
        this.employees = data.employees;
      });
    }
  }

  returnToDepartment(): void {
    this.router.navigate(['/departments', this.companyId]);
  }

  deleteEmployee(employeeId: string): void {
    const apiUrl = `http://localhost:8080/api/employees/${employeeId}`;
    this.http.delete(apiUrl).subscribe(() => {
      this.employees = this.employees.filter(employee => employee._id !== employeeId);
    });
  }
}