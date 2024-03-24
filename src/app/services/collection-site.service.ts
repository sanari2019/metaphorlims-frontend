import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionSite } from '../models/collectionSite.model';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CollectionSiteService {
  private apiUrl = environment.urlAddress + '/api/collectionsite';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CollectionSite[]> {
    return this.http.get<CollectionSite[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<CollectionSite> {
    return this.http.get<CollectionSite>(`${this.apiUrl}/collection-site/${id}`);
  }

  create(collectionSite: CollectionSite): Observable<CollectionSite> {
    return this.http.post<CollectionSite>(`${this.apiUrl}/collection-site`, collectionSite);
  }

  update(id: number, collectionSite: CollectionSite): Observable<CollectionSite> {
    return this.http.put<CollectionSite>(`${this.apiUrl}/collection-site/${id}`, collectionSite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/collection-site/${id}`);
  }
}
