import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/auth/user.model';
import { environment } from 'src/environments/environment';
import { EmailValidator } from '@angular/forms';
import { UsersRoles } from '../models/usersroles.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.urlAddress + '/api/users';
  // private apiUrl = environment.urlAddress + '/api/users';

  constructor(private http: HttpClient) { }

  getUse(): User | null {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user: User = JSON.parse(userString);
      return user;
    }

    return null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  getUserbyEmail(user: User) {
    return this.http.post<User>(`${this.baseUrl}/user/getuser/${user}`, user);
  }
  getEmployeeType(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}/employee-type`;

    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserRole(userId: number): Observable<UsersRoles> {
    const url = `${this.baseUrl}/userrole/${userId}`;

    return this.http.get<UsersRoles>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);

    // You can customize the error handling based on your needs
    return throwError('Something went wrong; please try again later.');
  }
}
