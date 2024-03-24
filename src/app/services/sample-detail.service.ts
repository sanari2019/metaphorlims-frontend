// sample-detail.service.ts

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SampleDetail } from '../models/sampleDetail.model';
import { environment } from 'src/environments/environment';
import { Messageee } from '../models/messageee.model';



@Injectable({
    providedIn: 'root'
})
export class SampleDetailService {
    private baseUrl = environment.urlAddress + '/api/SampleDetail';
    sampleDetailClosed: EventEmitter<void> = new EventEmitter<void>();


    constructor(private http: HttpClient) { }

    emitSampleDetailClosed(): void {
        this.sampleDetailClosed.emit();
    }

    createSampleDetail(sampleDetail: SampleDetail): Observable<SampleDetail> {
        return this.http.post<SampleDetail>(this.baseUrl, sampleDetail);
    }

    getSampleDetailById(id: number): Observable<SampleDetail> {
        return this.http.get<SampleDetail>(`${this.baseUrl}/${id}`);
    }

    getSampleDetails(): Observable<SampleDetail[]> {
        return this.http.get<SampleDetail[]>(this.baseUrl);
    }

    getSampleDetailsBySampleNo(sampleNo: number): Observable<SampleDetail> {
        return this.http.get<SampleDetail>(`${this.baseUrl}/sampleNo/${sampleNo}`);
    }
    updateSampleDetail(message: Messageee): Observable<SampleDetail> {
        return this.http.post<SampleDetail>(`${this.baseUrl}/update`, message).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
        } else {
            // Server-side error with non-JSON response
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    // Add other methods as needed
}
