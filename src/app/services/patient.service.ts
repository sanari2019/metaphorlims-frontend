// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from '../models/auth/user.model';


@Injectable({
    providedIn: 'root',
})
export class PatientService {
    private apiUrl = environment.urlAddress + '/api/patient';


    constructor(private http: HttpClient, private userService: UserService) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiUrl}`);
    }

    getPatientById(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiUrl}/${id}`);
    }
    getValidatedPatientsByUser(enteredByUserId: number): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiUrl}/validatedpatients/${enteredByUserId}`);
    }

    createPatient(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(`${this.apiUrl}`, patient);
    }
    getPatientByUlid(ulid: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiUrl}/ulid/${ulid}`);
    }

    updatePatient(patient: Patient): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/updatepatient`, patient);
    }

    deletePatient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
