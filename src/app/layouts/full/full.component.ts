import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';



/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})

export class FullComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  user!: Employee;
  currentDate!: Date;
  @ViewChild('snav') sidenav!: MatSidenav;
  // sidenavState!: string;
  // spanState!: string;



  // toggleSidenav(): void {
  //   this.sidenav.toggle();
  //   if (this.sidenav.opened) {
  //     this.sidenavState = 'opened';
  //     this.spanState = 'opened'; // Update sidenav animation state to 'open' if sidenav is open
  //   } else {
  //     this.sidenavState = 'closed';
  //     this.spanState = 'closed';
  //     this.changeDetectorRef.detectChanges(); // Update sidenav animation state to 'closed' if sidenav is closed
  //   }
  //   this.sidenavState = this.sidenav.opened ? 'opened' : 'closed';
  //   this.spanState = this.sidenav.opened ? 'opened' : 'closed';
  // }


  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService, private jwtHelper: JwtHelperService,
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private elementRef: ElementRef
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.removeClickOutsideListener();
  }
  ngAfterViewInit() {
    this.addClickOutsideListener();
    // this.sidenavState = this.sidenav.opened ? 'opened' : 'closed';
    // this.spanState = this.sidenav.opened ? 'opened' : 'closed';

  }
  ngOnInit() {
    const user_ = JSON.parse(localStorage.getItem('user') || '{}');
    this.isUserAuthenticated();
    this.currentDate = new Date();

    if (user_) {
      this.employeeService.getUser(user_).subscribe(data => {
        // Handle the response here
        this.user = data;

        // console.log(data);
      });
    }



    // this.sidenav.openedChange.subscribe(() => {
    //   // this.sidenavState = 'open'; // Update animation state to 'open' when sidenav is opened
    //   this.changeDetectorRef.detectChanges(); // Detect changes to trigger animation
    // });

    // this.sidenav..subscribe(() => {
    //   this.sidenavState = 'closed'; // Update animation state to 'closed' when sidenav is closed
    //   this.changeDetectorRef.detectChanges(); // Detect changes to trigger animation
    // });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("token");
    if (token) {
      if (!this.jwtHelper.isTokenExpired()) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }

  }

  logout() {
    this.authService.logout();
  }

  private addClickOutsideListener(): void {
    document.body.addEventListener('click', this.onClickOutside.bind(this));
  }

  private removeClickOutsideListener(): void {
    document.body.removeEventListener('click', this.onClickOutside.bind(this));
  }

  private onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the side nav, close it
      this.sidenav.close(); // Access the sidenav property to close it
    }
  }
}

