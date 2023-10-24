import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  companyId: string | null = null;
  companyData: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('companyId');
      this.getDepartmentData();
    });
  }

  getDepartmentData(): void {
    if (this.companyId) {
      const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/departments/company/${this.companyId}`;

      this.http.get(apiUrl).subscribe((data: any) => {
        this.departments = data;
      });
    }
  }

  viewEmployees(departmentId: string): void {
      
      // Navegar a la vista de departamentos con el companyId como parámetro
      this.router.navigate(['/employees', departmentId, this.companyId]);
  
  }
}
