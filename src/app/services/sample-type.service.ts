import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SampleTypeMaster } from '../models/sampleTypeMaster.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SampleTypeService {
  private apiUrl = environment.urlAddress + '/api/SampleTypeMaster';

  constructor(private http: HttpClient) { }

  getAll(): Observable<SampleTypeMaster[]> {
    return this.http.get<SampleTypeMaster[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<SampleTypeMaster> {
    return this.http.get<SampleTypeMaster>(`${this.apiUrl}/${id}`);
  }

  create(SampleTypeMaster: SampleTypeMaster): Observable<SampleTypeMaster> {
    return this.http.post<SampleTypeMaster>(`${this.apiUrl}`, SampleTypeMaster);
  }

  update(id: number, SampleTypeMaster: SampleTypeMaster): Observable<SampleTypeMaster> {
    return this.http.put<SampleTypeMaster>(`${this.apiUrl}/${id}`, SampleTypeMaster);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
