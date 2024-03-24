import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
// import { ReasonBottomsheetComponent } from '../../bottomsheets/reason-bottomsheet/reason-bottomsheet.component';
// import { RequestMainService } from 'src/app/services/request-main.service';
// import { ApprovalRequest } from 'src/app/models/models/approvalRequest.model';
import { User } from 'src/app/models/auth/user.model';
import { UserService } from 'src/app/services/user.service';
// import { ApprovalService } from 'src/app/services/approval.service';
// import { Approval } from 'src/app/models/models/approval.model';
import { EmployeeType } from 'src/app/models/employeeType.model';
import { EmpTypeService } from 'src/app/services/emp-type.service';
import { UsersRoles } from 'src/app/models/usersroles.model';
// import { RequestFormPatient } from 'src/app/models/models/requestFormPatient.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
// import { PatientDetailsComponent } from '../../dialogs/patient-details/patient-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessmessageComponent } from 'src/app/shared/successmessage/successmessage.component';
import { Router } from '@angular/router';
import { ViewUniqueSamplePerService } from 'src/app/models/viewUniqueSamplePerService.model';
import { SampleDetailComponent } from '../sample-detail/sample-detail.component';
import { SampleDetailService } from 'src/app/services/sample-detail.service';


@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  @Input() cardsData: ViewUniqueSamplePerService[] = [];

  // cnorequests: RequestFormPatient[] = [];
  // suprequests: RequestsMain[] = [];
  currentUser!: User;
  selectedRequest!: any;
  // approval!: Approval;
  empType!: EmployeeType;
  userrole!: UsersRoles;
  // _request!: ApprovalRequest;
  // _requests: ApprovalRequest[] = [];
  username: string = '';

  constructor(private sampleDetailService: SampleDetailService, private router: Router, private _snackBar: MatSnackBar, private emptypeservice: EmpTypeService, private _bottomSheet: MatBottomSheet, private userService: UserService, private dialog: MatDialog) { }
  openBottomSheet1(): void {
    // this._bottomSheet.open(ReasonBottomsheetComponent);
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    this._snackBar.openFromComponent(SuccessmessageComponent, {
      duration: 3000
    })
  }






  ngOnInit(): void {
    // this.sampleFilterModel = {

    //   sampleNo: null,
    //   ulid: null,
    //   status: 'ALL',
    //   startDate: this.selected.startDate,
    //   endDate: this.selected.endDate
    // };
    // this.samplePerService.getFilteredSamples(this.sampleFilterModel).subscribe(response => {
    //   this.viewSamples = response;
    // })
    const userId = localStorage.getItem('user')
    if (userId) {
      const userIdNumber = parseInt(userId, 10);
      // this.userService.getUser(userIdNumber).subscribe(
      //   user => {
      //     this.currentUser = user;
      //     // this.loadRequests();
      //   },
      //   error => {
      //     console.error('Error retrieving user:', error);
      //   }
      // );
    } else {
      console.error('User ID is null or undefined');
    }

    this.sampleDetailService.sampleDetailClosed.subscribe(() => {
      console.log('Sample detail dialog closed. Triggering ngOnInit...');
      this.ngOnInit();
    });


  }


  openDialog(selectedSample: number): void {
    const dialogRef = this.dialog.open(SampleDetailComponent, {
      width: 'auto',
      data: { selectedSample: selectedSample }
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // Refresh the card component or any other necessary components here
      // For example, if CardTableComponent needs to refresh, you can call a method to trigger the refresh
      // this.cardTableComponent.refreshData();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(PatientDetailsComponent, {
  //     // width: this.isLoading$ ? '500px' : '100%',
  //     // height: this.isLoading$ ? 'auto' : '100%',
  //     // panelClass: this.isLoading$ ? 'dialog-fullscreen' : '',
  //     data: { orderedMeals: this.orderedMeals },
  //     // disableClose: this.isLoading$ ? true : false,
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     //console.log('The dialog was closed');
  //     this.ngOnInit();
  //   });
  // }

  // getRequestByRequestId(requestId: number): void {
  //   this.requestService.getRequestByRequestId(requestId).subscribe(
  //     request => {
  //       this._request = request;
  //       // Assuming there's a property like entered_by_user_id in _request
  //       const enteredByUserId = this._request.entered_By_User_Id;

  //       if (this._request.entered_By_User_Id) {
  //         this.userService.getUser(this._request.entered_By_User_Id).subscribe(
  //           user => {
  //             // Assuming there are firstName and lastName properties in the user object
  //             this.username = `${user.first_Name} ${user.last_Name}`;
  //           },
  //           error => {
  //             console.error(`Error retrieving user with ID ${enteredByUserId}:`, error);
  //           }
  //         );
  //       }

  //     },
  //     error => {
  //       console.error(`Error retrieving request with ID ${requestId}:`, error);
  //     }
  //   );
  // }

}