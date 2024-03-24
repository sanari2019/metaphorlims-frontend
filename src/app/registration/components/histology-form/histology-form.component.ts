import { Component, Inject, OnInit } from '@angular/core';
import { HistologySample } from 'src/app/models/histologySample.model';
import { HistologySampleService } from 'src/app/services/histology-sample.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-histology-form',
  templateUrl: './histology-form.component.html',
  styleUrls: ['./histology-form.component.css']
})
export class HistologyFormComponent implements OnInit {
  histologyForm!: FormGroup;
  histologySample: HistologySample = new HistologySample();


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<HistologyFormComponent>,
    private histologySampleService: HistologySampleService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.histologyForm = this.fb.group({
      requisitionType: [''],
      specimenType: [''],
      specimenSite: [''],
      previousBiopsy: [false, Validators.required],
      sutureTag: [''],
      clinicalDetails: [''],
      operativeFindings: [''],
      provisionalDiagnosis: [''],
      investigationRequested: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.setHistoNoAndSearch(this.data.sampleData.histoNo);
    }
  }

  Onsubmit() {
    if (this.histologyForm.valid) {
      // Create a new instance of HistologySample with default values
      const histologySamplee: HistologySample = new HistologySample();

      // Assign form values to HistologySample object
      histologySamplee.sampleNo = this.data.sampleData.id;
      histologySamplee.serviceId = this.data.sampleData.serviceId;
      histologySamplee.requisitionType = this.histologyForm.get('requisitionType')?.value;
      histologySamplee.specimenType = this.histologyForm.get('specimenType')?.value;
      histologySamplee.specimenSite = this.histologyForm.get('specimenSite')?.value;
      histologySamplee.previousBiopsy = this.histologyForm.get('previousBiopsy')?.value;
      histologySamplee.sutureTag = this.histologyForm.get('sutureTag')?.value;
      histologySamplee.clinicalDetails = this.histologyForm.get('clinicalDetails')?.value;
      histologySamplee.operativeFindings = this.histologyForm.get('operativeFindings')?.value;
      histologySamplee.provisionalDiagnosis = this.histologyForm.get('provisionalDiagnosis')?.value;
      histologySamplee.investigationRequested = this.histologyForm.get('investigationRequested')?.value;

      // Call the createHistologySample method from the service
      this.histologySampleService.createHistologySample(histologySamplee).subscribe(
        (response) => {
          console.log('Histology Sample created successfully:', response);
          // Patch the form with the returned values
          this.histologyForm.patchValue(response);
          // Close the dialog
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error creating Histology Sample:', error);
          // Handle error if needed
        }
      );
    }
  }
  setHistoNoAndSearch(histoNo: number) {
    this.histologySampleService.getHistologySampleByHistoNo(histoNo).subscribe(response => {
      this.histologyForm.patchValue(response);
    })
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }
}
