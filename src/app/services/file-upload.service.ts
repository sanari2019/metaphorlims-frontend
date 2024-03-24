import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.urlAddress + '/api/resultfiles';
  constructor(private http: HttpClient) { }


  convertToDocx(htmlContent: string) {
    return this.http.post<any>(`${this.baseUrl}/convert-to-docx`, { htmlContent });
  }

  convertToPdf(htmlContent: string) {
    return this.http.post<any>(`${this.baseUrl}/convert-to-pdf`, { htmlContent });
  }

  uploadFile(content: string) {
    const formData = new FormData();
    formData.append('file', content);

    // Replace 'your-backend-url' with the actual URL of your ASP.NET backend endpoint
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
