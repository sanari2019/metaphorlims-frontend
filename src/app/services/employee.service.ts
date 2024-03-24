import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private baseUrl = environment.urlAddress + '/api/employee';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.baseUrl}`);
    }

    getUser(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}/${id}`);
    }

    createUser(user: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.baseUrl}`, user);
    }

    updateUser(id: number, user: Employee): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getEmployeeTypeFromUserId(userId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}/employee-type`);
    }

    getUserRolesByUserIdFromView(userId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${userId}/user-roles`);
    }

    getUserRole(user_id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/userrole/${user_id}`);
    }
}
