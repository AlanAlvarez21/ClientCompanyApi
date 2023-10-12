// update-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {}; // Define la estructura de tu objeto de usuario
  private apiEndpoint = 'https://nodejs-users-api-v86xc.kinsta.app/usuarios';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    console.log(userId)

    this.http.get(`${this.apiEndpoint}/${userId}`).subscribe(
      (data: any) => {
        this.user = data;
        console.log(data)
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  updateUser() {
    this.http.put(`${this.apiEndpoint}/${this.user.id}`, this.user).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}
