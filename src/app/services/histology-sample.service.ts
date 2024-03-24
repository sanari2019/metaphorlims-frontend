import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistologySample } from '../models/histologySample.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HistologySampleService {
    private apiUrl = environment.urlAddress + '/api/histologySample';

    constructor(private http: HttpClient) { }

    getHistologySamples(): Observable<HistologySample[]> {
        return this.http.get<HistologySample[]>(this.apiUrl);
    }

    getHistologySampleById(id: number): Observable<HistologySample> {
        return this.http.get<HistologySample>(`${this.apiUrl}/${id}`);
    }
    getHistologySampleByHistoNo(histoNo: number): Observable<HistologySample> {
        return this.http.get<HistologySample>(`${this.apiUrl}/histoNo/${histoNo}`);
    }
    getHistologySampleBySampleNo(sampleNo: number): Observable<HistologySample> {
        return this.http.get<HistologySample>(`${this.apiUrl}/sampleNo/${sampleNo}`);
    }

    createHistologySample(histologySample: HistologySample): Observable<HistologySample> {
        return this.http.post<HistologySample>(this.apiUrl, histologySample);
    }

    updateHistologySample(histoNo: number): Observable<HistologySample> {
        return this.http.post<HistologySample>(`${this.apiUrl}/${histoNo}`, histoNo);
    }

    deleteHistologySample(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
