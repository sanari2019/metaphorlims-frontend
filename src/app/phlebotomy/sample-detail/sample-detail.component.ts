import { Component, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { Messageee } from 'src/app/models/messageee.model';
import { SamplePerService } from 'src/app/models/samplePerService.model';
import { ViewUniqueSamplePerService } from 'src/app/models/viewUniqueSamplePerService.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { SampleDetailService } from 'src/app/services/sample-detail.service';
import { SamplePerServiceService } from 'src/app/services/sample-per-service.service';


@Component({
  selector: 'app-sample-detail',
  templateUrl: './sample-detail.component.html',
  styleUrls: ['./sample-detail.component.css']
})
export class SampleDetailComponent implements OnInit {
  @Input() selectedSample!: number;
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";


  @Output() dialogClosed = new EventEmitter<void>();
  sampleDetailClosed: EventEmitter<void> = new EventEmitter<void>();

  views!: ViewUniqueSamplePerService;
  samples!: SamplePerService[];
  employee!: Employee;
  sample: SamplePerService = new SamplePerService();
  ishistology: boolean = true;

  constructor(private employeeService: EmployeeService, private sampleDetailService: SampleDetailService, public dialogRef: MatDialogRef<SampleDetailComponent>, private samplePerService: SamplePerServiceService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // Get the user key value from local storage
    const userKeyValue = localStorage.getItem('user');

    const user = userKeyValue ? JSON.parse(userKeyValue) : null;

    // Pass the parsed user object to the getUser method
    if (user) {
      this.employeeService.getUser(user).subscribe(response => {
        // Handle response from getUser method if needed
        this.employee = response
      });
    }
    this.selectedSample = this.data.selectedSample;
    if (this.selectedSample) {
      this.samplePerService.getSamplePerServicesBySampleNo(this.selectedSample).subscribe(res => {
        this.samples = res;
        res.forEach(sample => {

          if (sample.departmentId === 14) {
            this.ishistology = false;
            if (sample.isHistoFilled === false) {

            }
          } else {
            this.ishistology = true;
          }
          // this.getsamplebyid(sample.id); // Assuming sample.id represents the sample ID
          this.sample = sample;

          // Fetch ServiceMaster object using serviceId from the current sample

        });
      });
    }
  }
  collect() {
    const confirmCollect = confirm("Are you sure you have collected this sample?");
    if (confirmCollect) {
      if (this.samples !== null || this.samples !== undefined) {
        const message1 = new Messageee();
        message1.id = this.samples[0].sampleNo;
        message1.message = "Collect";
        message1.userId = this.employee.id;
        this.sampleDetailService.updateSampleDetail(message1).subscribe(response => {
          // this.status = "Dispatched"   
          this.closeDialog();
        });
      }
      // Call the service method to update all samplePerService records
      // Assuming your service method is named updateSamplePerService
      // this.samplePerService.

      // this.samplePerServiceService.updateSamplePerService().subscribe(
      //   response => {
      //     // Handle success response
      //   },
      //   error => {
      //     // Handle error response
      //   }
      // );
    }
  }

  dispatch() {
    const confirmCollect = confirm("Are you sure you want to dispatch this sample?");
    if (confirmCollect) {
      if (this.samples !== null || this.samples !== undefined) {
        const message1 = new Messageee();
        message1.id = this.samples[0].sampleNo;
        message1.message = "Dispatch";
        message1.userId = this.employee.id;
        this.sampleDetailService.updateSampleDetail(message1).subscribe(response => {
          // this.status = "Dispatched"
          this.closeDialog();
        });
      }

    }
  }
  emitSampleDetailClosed(): void {
    this.sampleDetailClosed.emit();
  }


  closeDialog(): void {
    this.dialogRef.close();
    this.dialogClosed.emit();
    this.sampleDetailService.emitSampleDetailClosed();
  }

}
