import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeType } from '../models/employeeType.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpTypeService {
  private baseUrl = environment.urlAddress + '/api/emp-types';

  constructor(private http: HttpClient) { }

  getEmpTypes(): Observable<EmployeeType[]> {
    return this.http.get<EmployeeType[]>(`${this.baseUrl}`);
  }

  getEmpTypeById(id: number): Observable<EmployeeType> {
    return this.http.get<EmployeeType>(`${this.baseUrl}/${id}`);
  }

  createEmpType(empType: EmployeeType): Observable<EmployeeType> {
    return this.http.post<EmployeeType>(`${this.baseUrl}`, empType);
  }

  // Add update and delete methods if needed
}
