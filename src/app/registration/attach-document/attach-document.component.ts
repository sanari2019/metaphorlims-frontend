import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attach-document',
  templateUrl: './attach-document.component.html',
  styleUrls: ['./attach-document.component.css']
})
export class AttachDocumentComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  firstFormGroup!: FormGroup;
  uploadFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  userfound = false;
  selectedFile!: File;
  imageUrl!: string;
  private apiUrl = environment.urlAddress + '/api/patientfiles/upload';

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this._formBuilder.group({
      searchLabel: ['ULID', Validators.required],
      searchInput: ['', Validators.required]
    });
    this.uploadFormGroup = this._formBuilder.group({
      fileType: ['Image', Validators.required],
      filePath: ['', Validators.required]
    });
    // // Replace `patientId` with the actual ID of the patient whose image you want to retrieve
    // this.http.get<any>(`/api/patientfiles/${1}/image`).subscribe(
    //   response => {
    //     this.imageUrl = response.imageUrl;
    //   },
    //   error => {
    //     console.error('Error fetching image:', error);
    //   }
    // );
  }


  searchFormValidity() {
    if (this.searchFormGroup.valid) {
      this.userfound = true; // If both forms are valid, set userfound to true
    } else {
      this.userfound = false;
      //this.firstFormGroup.reset();
      this.uploadFormGroup.reset();
      //this.thirdFormGroup.reset();
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const filedData = new FormData();
    filedData.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.apiUrl, filedData).subscribe(result => {
      console.log(result);
    });
  }
}
