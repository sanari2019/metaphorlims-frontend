// sample-per-service.service.ts

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SamplePerService } from '../models/samplePerService.model';
import { environment } from 'src/environments/environment';
import { ViewUniqueSamplePerService } from '../models/viewUniqueSamplePerService.model';
import { SampleFilterModel } from '../models/sampleFilterModel.model';
import { ServiceRequestModel } from '../models/serviceRequestModel.model';
import { RequestedServiceViewModel } from '../models/requestedServiceViewModel.model';

@Injectable({
    providedIn: 'root'
})
export class SamplePerServiceService {
    private baseUrl = environment.urlAddress + '/api/SamplePerService';
    sampleServiceClosed: EventEmitter<void> = new EventEmitter<void>();

    constructor(private http: HttpClient) { }
    emitsampleServiceClosed(): void {
        this.sampleServiceClosed.emit();
    }

    createSamplePerService(samplePerService: SamplePerService): Observable<SamplePerService[]> {
        return this.http.post<SamplePerService[]>(this.baseUrl, samplePerService)
            .pipe(
                catchError(this.handleError)
            );
    }

    getSamplePerServiceById(id: number): Observable<SamplePerService> {
        return this.http.get<SamplePerService>(`${this.baseUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    getSamplePerServices(): Observable<SamplePerService[]> {
        return this.http.get<SamplePerService[]>(this.baseUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    getSamplePerServicesBySampleNo(sampleNo: number): Observable<SamplePerService[]> {
        return this.http.get<SamplePerService[]>(`${this.baseUrl}/sampleNo/${sampleNo}`)
            .pipe(
                catchError(this.handleError)
            );
    }
    getViewUniqueSamplePerServiceByUlid(ulid: number): Observable<ViewUniqueSamplePerService[]> {
        return this.http.get<ViewUniqueSamplePerService[]>(`${this.baseUrl}/ulid/${ulid}`)
            .pipe(
                catchError(this.handleError)
            );
    }
    updateSamplePerService(samplePerService: SamplePerService): Observable<SamplePerService[]> {
        return this.http.post<SamplePerService[]>(`${this.baseUrl}/update}`, samplePerService)
            .pipe(
                catchError(this.handleError)
            );
    }
    getFilteredSamples(filterModel: SampleFilterModel): Observable<ViewUniqueSamplePerService[]> {
        const url = `${this.baseUrl}/filtered`; // Adjust the API endpoint URL as per your setup

        // Set up headers if needed
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        // Make the HTTP request to the API endpoint
        return this.http.post<ViewUniqueSamplePerService[]>(url, filterModel, httpOptions)
            .pipe(
                catchError(this.handleError) // Handle errors if any
            );
    }
    getFilteredRequestedServices(filterModel: ServiceRequestModel): Observable<RequestedServiceViewModel[]> {
        const url = `${this.baseUrl}/filteredrequest`; // Adjust the API endpoint URL as per your setup

        // Set up headers if needed
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        // Make the HTTP request to the API endpoint
        return this.http.post<RequestedServiceViewModel[]>(url, filterModel, httpOptions)
            .pipe(
                catchError(this.handleError) // Handle errors if any
            );
    }



    // Add other methods as needed
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
