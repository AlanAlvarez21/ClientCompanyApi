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
  private apiEndpoint = 'https://nodejs-users-api-v86xc.kinsta.app';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    console.log(userId)

    this.http.get(`${this.apiEndpoint}/usuarios/${userId}`).subscribe(
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
    // Verificar que los campos no estén vacíos
    if (!this.user.name || !this.user.email || !this.user.age || !this.user.gender) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    // Resto de tu lógica para enviar la solicitud PUT
    this.http.put(`${this.apiEndpoint}/usuarios/${this.user.id}`, this.user).subscribe(
      () => {
        console.log('Usuario actualizado con éxito');
        this.router.navigate(['/users']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
  
}
