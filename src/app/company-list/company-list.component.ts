import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  companies: any[] = [];
  departments: any[] = []; // Array to store department data
  selectedCompanyId: string | null = null; // Variable to store the selected company's ID

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Define the API URL to fetch company data from
    const apiUrl = 'http://localhost:8080/api/companies/';

    // Make an HTTP GET request to the API to get companies
    this.http.get(apiUrl).subscribe((data: any) => {
      this.companies = data;
    });
  }

  deleteCompany(companyId: string): void {
    const apiUrl = `http://localhost:8080/api/companies/${companyId}`;

    this.http.delete(apiUrl).subscribe(() => {
      this.companies = this.companies.filter((company) => company._id !== companyId);
    });
  }

  getDepartments(companyId: string): void {
    const apiUrl = `http://localhost:8080/api/departments/company/${companyId}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.departments = data;
      this.selectedCompanyId = companyId;
      
      // Navegar a la vista de departamentos con el companyId como parámetro
      this.router.navigate(['/departments', companyId]);
    });
  }
}
