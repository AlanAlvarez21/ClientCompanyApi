import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  companies: any[] = [];
  departments: any[] = []; // Array to store department data
  selectedCompanyId: string | null = null; // Variable to store the selected company's ID

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Define the API URL to fetch company data from
    const apiUrl = 'https://api-company-3bbf1b72d2c9.herokuapp.com/api/companies/';

    // Make an HTTP GET request to the API to get companies
    this.http.get(apiUrl).subscribe((data: any) => {
      this.companies = data;
    });
  }

  deleteCompany(companyId: string): void {
    // Define the API URL for deleting a company by ID
    const apiUrl = `https://api-company-3bbf1b72d2c9.herokuapp.com/api/companies/${companyId}`;

    // Make an HTTP DELETE request to delete the company
    this.http.delete(apiUrl).subscribe(() => {
      // Remove the deleted company from the companies array
      this.companies = this.companies.filter((company) => company.id !== companyId);
    });
  }

  getDepartments(companyId: string): void {
    const apiUrl = `http://localhost:8080/api/departments/company/${companyId}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.departments = data;
      this.selectedCompanyId = companyId;
    });
  }
}
