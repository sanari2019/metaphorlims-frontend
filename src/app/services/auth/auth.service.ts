import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.urlAddress + '/api/users';
  public errorMessage: string = '';

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          // Assuming the backend returns a token on successful login
          if (response && response.token && response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', response.user.id);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred during login.';
          if (error.status === 401) {
            errorMessage = error.error.message || 'Invalid email or password.';
          }
          // Handle the error, log or display the error message
          console.error(errorMessage);
          return throwError(() => errorMessage);
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/auth']);
  }

  isAuthenticated1(): boolean {
    const token = localStorage.getItem("token");
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }



}
