

import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UntypedFormGroup, UntypedFormBuilder, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DepartmentService } from 'src/app/services/department.service';
import { User } from 'src/app/models/auth/user.model';
import { UserService } from 'src/app/services/user.service';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, tap, filter, map, take, takeUntil } from 'rxjs/operators';
import { SamplePerService } from 'src/app/models/samplePerService.model';
import { SamplePerServiceService } from 'src/app/services/sample-per-service.service';
import { CollectionSite } from 'src/app/models/collectionSite.model';
import { ReferralType } from 'src/app/models/referralType.model';
import { SampleTypeMaster } from 'src/app/models/sampleTypeMaster.model';
import { ServiceMaster } from 'src/app/models/serviceMaster.model';
import { CollectionSiteService } from 'src/app/services/collection-site.service';
import { ReferralTypeService } from 'src/app/services/referral-type.service';
import { SampleTypeService } from 'src/app/services/sample-type.service';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { ServiceMasterGroup } from 'src/app/models/serviceMasterGroup.model';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ViewUniqueSamplePerService } from 'src/app/models/viewUniqueSamplePerService.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { SampleDetail } from 'src/app/models/sampleDetail.model';
import { SampleDetailService } from 'src/app/services/sample-detail.service';
import { Messageee } from 'src/app/models/messageee.model';
import { StatusMaster } from 'src/app/models/statusMaster.model';
import { HistologyFormComponent } from '../histology-form/histology-form.component';


@Component({
    selector: 'app-sample-registration',
    templateUrl: './sample-registration.component.html',
    styleUrls: ['./sample-registration.component.css']
})
export class SampleRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('multiSelect') multiSelect!: MatSelect;
    @Input()
    get color(): string {
        return this._color;
    }
    set color(color: string) {
        this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";

    @Input() showToggleAllCheckbox = false;

    sampleFormGroup!: FormGroup;
    searchFormGroup!: FormGroup;
    samplefound = false;
    sample: SamplePerService = new SamplePerService();
    collectionSites!: CollectionSite[];
    referralTypes!: ReferralType[];
    sampleTypes!: SampleTypeMaster[];
    serviceMasters!: ServiceMaster[];
    servMasters: ServiceMaster[] = [];
    samplePerServices!: SamplePerService[];
    patient!: Patient;
    viewuniquesample: ViewUniqueSamplePerService[] = [];
    employee!: Employee;
    status: string = "Not Collected";
    ishistology: boolean = true;
    location: string = '';

    serviceMasters$!: Observable<ServiceMaster[]>; // Observable for service masters
    filteredServiceMulti$!: Observable<ServiceMaster[]>; // Observable for filtered services

    /** Control for the selected services */
    public serviceMaster: FormControl = new FormControl();

    /** Control for filtering services */
    public serviceMultiFilterCtrl: FormControl = new FormControl();

    /** List of services filtered by search keyword */
    public filteredServiceMulti: ServiceMaster[] = [];

    /** indicate search operation is in progress */
    public searching: boolean = false;
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
    allSelected = false;
    uniqueid = this.data.ulid;



    constructor(private sampleDetailService: SampleDetailService, private employeeService: EmployeeService, private _formBuilder: FormBuilder, private patientService: PatientService, private samplePerService: SamplePerServiceService, public dialog: MatDialog,
        private collectionSiteService: CollectionSiteService,
        private referralTypeService: ReferralTypeService,
        private sampleTypeService: SampleTypeService,
        private serviceMasterService: ServiceMasterService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.sampleFormGroup = this._formBuilder.group({
            collectionSite: ['', Validators.required],
            sampleType: [''],
            referralType: ['', Validators.required],
            referredBy: ['', Validators.required],
            serviceMaster: [[], Validators.required], // For multiple selection
            clinical: ['', Validators.required]
        });
        this.searchFormGroup = this._formBuilder.group({
            searchLabel: ['sampleNo', Validators.required],
            searchInput: []
        })
    }
    ngAfterViewInit(): void {
        // throw new Error('Method not implemented.');
    }
    setSampleNoAndSearch(sampleNo: number) {
        // Set the value of searchInput to the sampleNo
        this.searchFormGroup.get('searchInput')?.setValue(sampleNo);

        // Call the searchFormValidity function
        this.searchFormValidity();
    }
    openHistologyFormDialog(sample: SamplePerService): void {
        const dialogRef = this.dialog.open(HistologyFormComponent, {
            width: '80%',
            maxWidth: '80%',
            height: '80%',
            maxHeight: '80%',
            autoFocus: true, // Set to true if you want the first focusable element to receive focus
            data: {
                // You can pass data to the dialog if needed
                sampleData: sample
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            // Handle dialog close event if needed
            this.searchFormValidity();
        });
    }

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
        this.samplePerService.getViewUniqueSamplePerServiceByUlid(this.data.ulid).subscribe(res => {
            this.viewuniquesample = res;
        })


        this.patientService.getPatientByUlid(this.data.ulid).subscribe(patient => {
            this.patient = patient;
        })
        // Fetch data from services and populate form fields
        this.collectionSiteService.getAll().subscribe(data => {
            this.collectionSites = data;
        });

        this.referralTypeService.getAll().subscribe(data => {
            this.referralTypes = data;
        });

        this.sampleTypeService.getAll().subscribe(data => {
            this.sampleTypes = data;
        });

        this.serviceMasterService.getAll().subscribe(data => {
            this.serviceMasters = data;
            this.filteredServiceMulti = data; // Initialize filtered list
        });
        // // Fetch service masters
        this.serviceMasters$ = this.serviceMasterService.getAll();

        // Subscribe to changes in the filter control
        this.serviceMasters$.pipe(
            takeUntil(this._onDestroy)
        ).subscribe(serviceMasters => {
            this.filteredServiceMulti$ = this.serviceMultiFilterCtrl.valueChanges.pipe(
                takeUntil(this._onDestroy),
                map(filterValue => this.filterServicesMulti2(serviceMasters, filterValue))
            );
        });
        // Subscribe to changes in the service filter control
        this.serviceMultiFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterServicesMulti();
            });


    }

    addSample() {
        if (this.sampleFormGroup.valid) {
            const formData = this.sampleFormGroup.value;
            const newSample: SamplePerService = {
                id: 0, // Assuming id is autogenerated on the server side
                sampleTypeId: formData.sampleType,
                sampleNo: 0, // Assuming sampleNo is autogenerated on the server side
                serviceId: 0,
                departmentId: 0, // Update as needed
                collectionSiteId: formData.collectionSite,
                referalTypeId: formData.referralType,
                referredBy: formData.referredBy,
                remarks: '', // Update as needed
                labTechnician: 0, // Update as needed
                labSupervisor: 0, // Update as needed
                labDoctor: 0, // Update as needed
                statusId: 1, // Update as needed
                stageId: 6,
                histoNo: 0, // Update as needed
                encodedBy: this.data.user_id, // Update as needed
                encodedDate: new Date(), // Update as needed
                lastChangedBy: 0, // Update as needed
                lastChangeDate: new Date(), // Update as needed
                patientId: 0, // Update as needed
                ulid: this.data.ulid, // Update as needed
                clinicalRemarks: formData.clinical,
                provisionalResultDate: new Date(), // Update as needed
                provisionalResultReleasedBy: 0, // Update as needed
                reportTypeId: 0, // Update as needed
                finalRemarks: '', // Update as needed
                printStatus: false, // Update as needed
                printLabelSatus: false, // Update as needed
                testDateTime: new Date(), // Update as needed
                redoDiagSampleId: false, // Update as needed
                isRedone: false, // Update as needed
                location: '', // Update as needed
                employeeTypePhase: 1, // Update as needed
                serviceMaster: formData.serviceMaster, // Update as needed
                serviceMasters: [],
                user: this.employee.id,
                statusMaster: new StatusMaster(),
                isHistoFilled: false,
                servmaster: new ServiceMaster(),
                sampleDetail: new SampleDetail(),
                cemployee: new Employee(),
                aemployee: new Employee(),
                demployee: new Employee()
            };
            // You can perform any additional processing of form data here if needed
            this.samplePerService.createSamplePerService(newSample).subscribe(response => {
                this.samplePerServices = response
                console.log('Sample created successfully:', response);
                const serviceIds = response.map(item => item.serviceId);
                const sampleIds = response.map(item => item.id);
                // Update the form with the returned patient object
                this.searchFormGroup.patchValue({
                    searchInput: response[0].sampleNo
                });
                this.sampleFormGroup.patchValue(response);


                // Set userfound to true
                this.samplefound = true;
                this.allSelected = false; // Reset allSelected status
                this.location = response[0].location;
                // Iterate over each sample in the response
                response.forEach(sample => {

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
                    this.serviceMasterService.getById(sample.serviceId).subscribe(
                        (serviceMaster: ServiceMaster) => {
                            this.servMasters.push(serviceMaster);
                        },
                        (error) => {
                            console.error('Error fetching ServiceMaster:', error);
                        }
                    );
                });
            }, error => {
                console.error('Error creating sample:', error);
                // Handle error if needed
            });
        } else {
            // Form is invalid, display validation errors
            Object.values(this.sampleFormGroup.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }
    collect() {
        const searchInputValue = this.searchFormGroup.get('searchInput')!.value;
        const confirmCollect = confirm("Are you sure you have collected this sample?");
        if (confirmCollect) {
            if (this.searchFormGroup.valid) {
                const message1 = new Messageee();
                message1.id = this.samplePerServices[0].sampleNo;
                message1.message = "Collect";
                message1.userId = this.employee.id;
                this.sampleDetailService.updateSampleDetail(message1).subscribe(response => {
                    this.status = "Collected"
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


    // toggleSelectAll(selectAllValue: boolean) {
    // this.filteredBanksMulti.pipe(take(1), takeUntil(this._onDestroy))
    //   .subscribe(val => {
    //     if (selectAllValue) {
    //       this.bankMultiCtrl.patchValue(val);
    //     } else {
    //       this.bankMultiCtrl.patchValue([]);
    //     }
    //   });
    // }

    getsamplebyid(id: number) {
        this.samplePerService.getSamplePerServiceById(id).subscribe(response => {
            this.sample = response;
        })
    }

    searchFormValidity() {

        this.servMasters = []; // Clear servMasters array

        if (this.searchFormGroup.valid) {
            const sampleNo = this.searchFormGroup.get('searchInput')!.value;

            // Call getPatientbyUlid method from PatientService to fetch the patient object
            this.samplePerService.getSamplePerServicesBySampleNo(sampleNo).subscribe(
                (sample: SamplePerService[]) => {
                    this.samplePerServices = sample;
                    this.status = sample[0].statusMaster.status;
                    this.location = sample[0].location;
                    this.ishistology = sample[0].isHistoFilled;
                    const serviceIds = sample.map(item => item.serviceId);
                    const sampleIds = sample.map(item => item.id);
                    const serviceIdsString = serviceIds.join(', ');
                    // Patch values to all forms input
                    this.sampleFormGroup.patchValue({
                        collectionSite: sample[0].collectionSiteId,
                        sampleType: sample[0].sampleTypeId,
                        referralType: sample[0].referalTypeId,
                        referredBy: sample[0].referredBy,
                        serviceMaster: '',// For multiple selection
                        clinical: sample[0].clinicalRemarks
                    });

                    this.samplefound = true; // Set userfound to true
                    // Iterate over each sample in the response
                    sample.forEach(sample => {

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
                        this.serviceMasterService.getById(sample.serviceId).subscribe(
                            (serviceMaster: ServiceMaster) => {
                                this.servMasters.push(serviceMaster);
                            },
                            (error) => {
                                console.error('Error fetching ServiceMaster:', error);
                            }
                        );
                    });
                },
                (error) => {
                    console.error('Error fetching patient:', error);
                    this.samplefound = false;
                    this.sampleFormGroup.reset();
                }
            );
        } else {
            this.samplefound = false;
            this.sampleFormGroup.reset();
        }
    }
    formReset() {
        this.samplefound = false;
        this.sampleFormGroup.reset();
        this.searchFormGroup.patchValue({
            searchInput: '' // Assuming 'searchInput' is the name of the FormControl in searchFormGroup
        });
        this.servMasters = [];
    }


    toggleSelectAll(selectAllValue: boolean) {
        selectAllValue = this.allSelected;
        if (this.allSelected) {
            this.filteredServiceMulti$.pipe(
                take(1), takeUntil(this._onDestroy)
            ).subscribe(services => {
                // const selectedServiceIds = services.map(service => service.id);
                this.serviceMaster.patchValue(services);
            });
        } else {
            this.serviceMaster.patchValue([]); // Deselect all services
        }
    }
    toggleAllSelection() {
        this.filteredServiceMulti$.pipe(
            take(1), takeUntil(this._onDestroy)
        ).subscribe(services => {
            if (this.allSelected) {
                this.multiSelect.options.forEach((item: MatOption) => item.select());
                this.serviceMaster.patchValue(services);
            } else {
                this.multiSelect.options.forEach((item: MatOption) => item.deselect());
                this.serviceMaster.patchValue(services);
            }
        });
    }
    optionClick() {
        let newStatus = true;
        this.multiSelect.options.forEach((item: MatOption) => {
            if (!item.selected) {
                newStatus = false;
            }
        });
        this.allSelected = newStatus;
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    filterServicesMulti() {
        const search = this.serviceMultiFilterCtrl.value.toLowerCase();
        this.filteredServiceMulti = this.serviceMasters.filter(service =>
            service.serviceName.toLowerCase().includes(search)
        );
    }
    filterServicesMulti2(serviceMasters: ServiceMaster[], filterValue: string): ServiceMaster[] {
        return serviceMasters.filter(service =>
            service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

}

