import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusMaster } from '../models/statusMaster.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatusMasterService {
    private apiUrl = environment.urlAddress + '/api/statusmaster';

    constructor(private http: HttpClient) { }

    createStatusMaster(statusMaster: StatusMaster): Observable<StatusMaster> {
        return this.http.post<StatusMaster>(this.apiUrl, statusMaster);
    }

    getStatusMasterById(id: number): Observable<StatusMaster> {
        return this.http.get<StatusMaster>(`${this.apiUrl}/${id}`);
    }

    getAllStatusMasters(): Observable<StatusMaster[]> {
        return this.http.get<StatusMaster[]>(this.apiUrl);
    }

    updateStatusMaster(id: number, statusMaster: StatusMaster): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, statusMaster);
    }

    deleteStatusMaster(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    getStatusMasterByStatusType(statusType: string): Observable<StatusMaster[]> {
        return this.http.get<StatusMaster[]>(`${this.apiUrl}/statusType/${statusType}`);
    }
}
