import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceMaster } from '../models/serviceMaster.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceMasterService {
  private apiUrl = environment.urlAddress + '/api/servicemaster';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ServiceMaster[]> {
    return this.http.get<ServiceMaster[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<ServiceMaster> {
    return this.http.get<ServiceMaster>(`${this.apiUrl}/${id}`);
  }

  create(serviceMaster: ServiceMaster): Observable<ServiceMaster> {
    return this.http.post<ServiceMaster>(`${this.apiUrl}`, serviceMaster);
  }

  update(id: number, serviceMaster: ServiceMaster): Observable<ServiceMaster> {
    return this.http.put<ServiceMaster>(`${this.apiUrl}/${id}`, serviceMaster);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
