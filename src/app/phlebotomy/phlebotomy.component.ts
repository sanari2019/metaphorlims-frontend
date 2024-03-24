import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs/esm';
import { DateRange, DateRanges, TimePeriod } from 'ngx-daterangepicker-material/daterangepicker.component';
import * as moment from 'moment';
import { createPopper } from "@popperjs/core";
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
import { MatFormField } from '@angular/material/form-field';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UntypedFormGroup, UntypedFormBuilder, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DepartmentService } from 'src/app/services/department.service';
import { User } from 'src/app/models/auth/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';
import { Patient } from '../models/patient.model';
import { SamplePerService } from '../models/samplePerService.model';
import { SampleTypeMaster } from '../models/sampleTypeMaster.model';
import { CollectionSite } from '../models/collectionSite.model';
import { ReferralType } from '../models/referralType.model';
import { PatientService } from '../services/patient.service';
import { SamplePerServiceService } from '../services/sample-per-service.service';
import { Department } from '../models/department.model';
import { StatusMasterService } from '../services/status-master.service';
import { SampleFilterModel } from '../models/sampleFilterModel.model';
import { MatDialog } from '@angular/material/dialog';
import { SampleDetailComponent } from './sample-detail/sample-detail.component';
import { CardTableComponent } from './card-table/card-table.component';





@Component({
  selector: 'app-phlebotomy',
  templateUrl: './phlebotomy.component.html',
  styleUrls: ['./phlebotomy.component.css']
})
export class PhlebotomyComponent implements OnInit, AfterViewInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;
  @ViewChild(CardTableComponent) cardTableComponent!: CardTableComponent;
  filterFormGroup!: FormGroup;
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
  departments!: Department[];
  sampleFilterModel: SampleFilterModel = { startDate: new Date(), endDate: new Date(), sampleNo: null, ulid: null, statusId: null }; // Initialize the sample filter model
  viewSamples!: ViewUniqueSamplePerService[];

  isSidebarOpen = false;


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  serviceMasters$!: Observable<ServiceMaster[]>; // Observable for service masters
  filteredServiceMulti$!: Observable<ServiceMaster[]>; // Observable for filtered services

  /** Control for the selected services */
  // public serviceMaster: FormControl = new FormControl();

  /** Control for filtering services */
  // public serviceMultiFilterCtrl: FormControl = new FormControl();

  /** List of services filtered by search keyword */
  public filteredServiceMulti: ServiceMaster[] = [];

  /** indicate search operation is in progress */
  public searching: boolean = false;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  allSelected = false;
  statusMasters: StatusMaster[] = [];
  sampleNo: any;
  ulid: any;
  statuss: any;
  dateRangee: any;



  selected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: dayjs.Dayjs;
  minDate: dayjs.Dayjs;
  invalidDates: dayjs.Dayjs[] = [];
  tooltips = [
    { date: dayjs(), text: 'Today is just unselectable' },
    { date: dayjs().add(2, 'days'), text: 'Yeeeees!!!' }
  ];

  inlineDateTime!: TimePeriod;
  ranges: DateRanges = {
    ['Today']: [dayjs(), dayjs()],
    ['Yesterday']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    ['Last 7 Days']: [dayjs().subtract(6, 'days'), dayjs()],
    ['Last 30 Days']: [dayjs().subtract(29, 'days'), dayjs()],
    ['This Month']: [dayjs().startOf('month'), dayjs().endOf('month')],
    ['Last Month']: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    ['Last 3 Month']: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  };


  constructor(private sampleDetailService: SampleDetailService, private employeeService: EmployeeService, private _formBuilder: FormBuilder, private patientService: PatientService, private samplePerService: SamplePerServiceService,
    private departmentService: DepartmentService,
    private statusMasterService: StatusMasterService,
    private collectionSiteService: CollectionSiteService,
    private referralTypeService: ReferralTypeService,
    private sampleTypeService: SampleTypeService,
    public dialog: MatDialog,
    private serviceMasterService: ServiceMasterService) {
    this.maxDate = dayjs().add(2, 'weeks');
    this.minDate = dayjs().subtract(3, 'days');
    this.alwaysShowCalendars = true;

    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true; this.selected = {
      startDate: moment(),
      endDate: moment()
    };

    // this.selected = {
    //   startDate: dayjs().subtract(1, 'days').set('hours', 0).set('minutes', 0),
    //   endDate: dayjs().subtract(1, 'days').set('hours', 23).set('minutes', 59)
    // };
    this.filterFormGroup = this._formBuilder.group({
      dateRange: [],
      sampleNo: [null],
      ulid: [null],
      status: [],
      // serviceMaster: [], // For multiple selection
    });
    this.sampleFilterModel = {

      sampleNo: this.filterFormGroup.get('sampleNo')?.value,
      ulid: this.filterFormGroup.get('ulid')?.value,
      statusId: this.filterFormGroup.get('status')?.value,
      startDate: this.selected.startDate,
      endDate: this.selected.endDate
    };
    this.dateRangee = this.filterFormGroup.get('dateRange')?.value
    this.sampleNo = this.sampleFilterModel.sampleNo?.toString();
    this.ulid = this.sampleFilterModel.ulid?.toString();
    this.statuss = this.sampleFilterModel.statusId?.toString();
  }

  ngOnInit(): void {
    // this.departmentService.getDepartments().subscribe(response => {
    //   this.departments = response;
    this.viewSamples = [];
    this.dateRangee = this.filterFormGroup.get('dateRange')?.value
    this.sampleNo = this.filterFormGroup.get('sampleNo')?.value
    this.ulid = this.filterFormGroup.get('ulid')?.value
    this.statuss = this.filterFormGroup.get('status')?.value
    this.getStatusMasterByStatusType("LAB");
    this.samplePerService.getFilteredSamples(this.sampleFilterModel).subscribe(response => {
      this.viewSamples = response;
    })
    this.getNotCollectedCount();
    this.getCollectedCount();
    this.getDispatchedCount();
    this.sampleDetailService.sampleDetailClosed.subscribe(() => {
      console.log('Sample detail dialog closed. Triggering ngOnInit...');
      this.ngOnInit();
    });

  }

  // Method to handle the sample detail update event
  handleSampleDetailUpdate(): void {
    // Update other content or perform any necessary actions
    console.log('Sample detail updated. Updating other content...');
    // For example, update viewSamples or other properties
    this.cardTableComponent.cardsData = this.viewSamples; // Assuming cardsData contains the updated data
  }

  Onsubmit() {
    this.sampleFilterModel = {

      sampleNo: this.filterFormGroup.get('sampleNo')?.value,
      ulid: this.filterFormGroup.get('ulid')?.value,
      statusId: this.filterFormGroup.get('status')?.value,
      startDate: this.selected.startDate,
      endDate: this.selected.endDate
    };
    this.dateRangee = this.filterFormGroup.get('dateRange')?.value
    this.sampleNo = this.filterFormGroup.get('sampleNo')?.value
    this.ulid = this.filterFormGroup.get('ulid')?.value
    this.statuss = this.filterFormGroup.get('status')?.value

    this.ngOnInit();
    this.toggleSidebar();
  }
  getNotCollectedCount(): number {
    if (!this.viewSamples) return 0; // Handle null or undefined viewSamples
    return this.viewSamples.filter(sample => sample.status === 'Not Collected').length;
  }
  getCollectedCount(): number {
    if (!this.viewSamples) return 0; // Handle null or undefined viewSamples
    return this.viewSamples.filter(sample => sample.status === 'Collected').length;
  }
  getDispatchedCount(): number {
    if (!this.viewSamples) return 0; // Handle null or undefined viewSamples
    return this.viewSamples.filter(sample => sample.status === 'Dispatched').length;
  }

  getStatusMasterByStatusType(statusType: string): void {
    this.statusMasterService.getStatusMasterByStatusType(statusType)
      .subscribe(statusMasters => {
        this.statusMasters = statusMasters;
      });
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SampleDetailComponent, {
  //     width: '250px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.ngOnInit();
  //   });
  // }

  isInvalidDate = (m: dayjs.Dayjs): boolean => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  isTooltipDate = (m: Dayjs): string | boolean | null => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };

  rangeClicked(range: DateRange): void {
    // eslint-disable-next-line no-console
    console.log('[rangeClicked] range is : ', range);
  }

  datesUpdated(range: TimePeriod): void {
    // eslint-disable-next-line no-console
    console.log('[datesUpdated] range is : ', range);
  }

  chosenDateTime(e: TimePeriod): void {
    this.inlineDateTime = e;
  }

  ngAfterViewInit() {
    // createPopper(
    //   this.btnDropdownRef.nativeElement,
    //   this.popoverDropdownRef.nativeElement,
    //   {
    //     placement: "bottom-start",
    //   }
    // );

  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  applyFilter() { }
}
