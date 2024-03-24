import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReferralType } from '../models/referralType.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferralTypeService {
  private apiUrl = environment.urlAddress + '/api/referraltype';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ReferralType[]> {
    return this.http.get<ReferralType[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<ReferralType> {
    return this.http.get<ReferralType>(`${this.apiUrl}/${id}`);
  }

  create(referralType: ReferralType): Observable<ReferralType> {
    return this.http.post<ReferralType>(`${this.apiUrl}`, referralType);
  }

  update(id: number, referralType: ReferralType): Observable<ReferralType> {
    return this.http.put<ReferralType>(`${this.apiUrl}/${id}`, referralType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
