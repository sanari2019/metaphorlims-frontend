import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { Patient } from 'src/app/models/patient.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import { SampleRegistrationComponent } from '../components/sample-registration/sample-registration.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.css']
})
export class DemographicComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  userfound = false;
  employee: Employee = new Employee();


  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private patientService: PatientService, private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit() {
    // Initialize employee using the employee model and the getUser method
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      const userId = user;
      this.employeeService.getUser(userId).subscribe(
        (user) => {
          this.employee = user;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
    this.searchFormGroup = this._formBuilder.group({
      searchLabel: ['ULID', Validators.required],
      searchInput: ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: [''],
      company: [''],
      dob: [new Date('yyyy-mm-dd'), Validators.required],
      fullAddress: [''],
      phoneNumber: ['', [Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
      email: ['', [Validators.email]],
      emergencyContactName: [''],
      emergencyContactPhone: ['', [Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
      bill: [''],
      result: [''],
      referralType: ['', Validators.required], // Add validators as needed
      referredBy: ['', Validators.required] // Add validators as needed
    });

    // Update the form control value to an empty string if it's 0

  }

  searchFormValidity() {
    if (this.searchFormGroup.valid) {
      const ulid = this.searchFormGroup.get('searchInput')!.value;

      // Call getPatientbyUlid method from PatientService to fetch the patient object
      this.patientService.getPatientByUlid(ulid).subscribe(
        (patient: Patient) => {
          // Patch values to all forms input
          this.firstFormGroup.patchValue({
            title: patient.title,
            firstName: patient.firstName,
            middleName: patient.middleName,
            lastName: patient.lastName,
            gender: patient.gender,
            company: patient.company,
            dob: formatDate(new Date(patient.dob), 'yyyy-MM-dd', 'en-US'),
            fullAddress: patient.fullAddress,
            phoneNumber: patient.phoneNumber,
            email: patient.email,
            emergencyContactName: patient.emergencyContactFullName,
            emergencyContactPhone: patient.emergencyContactPhoneNumber,
            bill: patient.bill,
            result: patient.result,
            referralType: patient.referralType,
            referredBy: patient.referredBy
          });

          this.userfound = true; // Set userfound to true
        },
        (error) => {
          console.error('Error fetching patient:', error);
          this.userfound = false;
          this.firstFormGroup.reset();
        }
      );
    } else {
      this.userfound = false;
      this.firstFormGroup.reset();
    }
  }
  formReset() {
    this.userfound = false;
    // this.searchFormGroup.reset();
    this.firstFormGroup.reset();
    this.searchFormGroup.patchValue({
      searchInput: '' // Assuming 'searchInput' is the name of the FormControl in searchFormGroup
    });

  }

  // Custom validator function to check if the date is valid
  isValidDate(control: FormControl) {
    const dob = control.value;
    if (dob) {
      const dateParts = dob.split('-');
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);
      const isValid = !isNaN(year) && !isNaN(month) && !isNaN(day) &&
        month >= 1 && month <= 12 && day >= 1 && day <= 31;
      return isValid ? null : { invalidDate: true };
    }
    return null;
  }



  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }
  openreqDialog() {
    const user = localStorage.getItem('user');
    if (user) {
      const user_Id = JSON.parse(user);
      const ulid = this.searchFormGroup.get('searchInput')!.value;
      const dialogRef = this.dialog.open(SampleRegistrationComponent, {
        height: 'auto',
        data: {
          user_id: user_Id,
          ulid: ulid
        }
      });

    }
  }

  savePatient() {
    if (!this.firstFormGroup.touched) {
      console.error('No changes were made to the form.');
      return;
    }

    if (!this.firstFormGroup.dirty) {
      console.error('Invalid form data. Please fill all required fields correctly.');
      return;
    }

    const { ...patientData } = this.firstFormGroup.value;
    // const newPatient: Patient = {
    //   id: 0,
    //   ulid: this.searchFormGroup.get('searchInput')!.value,
    //   encodedBy: this.employee.id,
    //   encodedDate: new Date(),
    //   lastChangedBy: this.employee.id,
    //   lastChangedDate: new Date(),
    //   ...patientData
    // };
    const newPatient: Patient = {
      id: 0,
      ulid: this.searchFormGroup.get('searchInput')!.value,
      encodedBy: this.employee.id,
      encodedDate: new Date(),
      lastChangedBy: this.employee.id,
      lastChangedDate: new Date(),
      title: this.firstFormGroup.get('title')!.value,
      firstName: this.firstFormGroup.get('firstName')!.value,
      middleName: this.firstFormGroup.get('middleName')!.value,
      lastName: this.firstFormGroup.get('lastName')!.value,
      gender: this.firstFormGroup.get('gender')!.value,
      company: this.firstFormGroup.get('company')!.value,
      dob: this.firstFormGroup.get('dob')!.value,
      fullAddress: this.firstFormGroup.get('fullAddress')!.value,
      phoneNumber: this.firstFormGroup.get('phoneNumber')!.value,
      email: this.firstFormGroup.get('email')!.value,
      emergencyContactFullName: this.firstFormGroup.get('emergencyContactName')!.value,
      emergencyContactPhoneNumber: this.firstFormGroup.get('emergencyContactPhone')!.value,
      referralType: this.firstFormGroup.get('referralType')!.value,
      referredBy: this.firstFormGroup.get('referredBy')!.value,
      bill: this.firstFormGroup.get('bill')!.value, // Add appropriate values
      result: this.firstFormGroup.get('result')!.value, // Add appropriate values
    };



    console.log('New Patient:', newPatient);

    // Call the patient service to save the new patient
    this.patientService.createPatient(newPatient).subscribe(
      (response) => {
        // Handle successful patient creation
        console.log('Patient created successfully:', response);

        // Update the form with the returned patient object
        this.searchFormGroup.patchValue({
          searchInput: response.ulid
        });
        this.firstFormGroup.patchValue(response);

        // Set userfound to true
        this.userfound = true;

        // Optionally, reset the form groups after successful submission
        // this.firstFormGroup.reset();
        // this.secondFormGroup.reset();
        // this.thirdFormGroup.reset();
      },
      (error) => {
        // Handle error
        console.error('Error creating patient:', error);
      }
    );
  }
}


