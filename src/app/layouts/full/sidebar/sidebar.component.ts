import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  user!: Employee;
  collapseShow = "hidden";
  panelOpenState: boolean = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(

    private authService: AuthService,
    private employeeService: EmployeeService, private jwtHelper: JwtHelperService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    const user_ = JSON.parse(localStorage.getItem('user') || '{}');
    this.isUserAuthenticated();


    this.employeeService.getUser(user_).subscribe(data => {
      // Handle the response here
      this.user = data;

      // console.log(data);
    });
    // // Subscribe to router events
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     // Navigation has ended, close the sidebar
    //     this.panelOpenState = false;
    //   });
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

  logout(): void {
    this.authService.logout();
  }
}


