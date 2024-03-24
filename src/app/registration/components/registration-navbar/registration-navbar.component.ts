import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-registration-navbar',
  templateUrl: './registration-navbar.component.html',
  styleUrls: ['./registration-navbar.component.css']
})
export class RegistrationNavbarComponent implements OnInit {
  activeChipIndex = 0;
  collapseShow = "hidden";
  panelOpenState = false;

  constructor(private router: Router) { }


  ngOnInit() {
    // Initialize active chip index based on current URL
    this.updateActiveChipIndex(this.router.url);

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Cast event to NavigationEnd
      const navigationEndEvent = event as NavigationEnd;

      // Update active chip index based on current URL
      this.updateActiveChipIndex(navigationEndEvent.urlAfterRedirects);
    });
  }
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  // Update active chip index based on the current URL
  // Update active chip index based on the current URL
  private updateActiveChipIndex(url: string) {
    switch (url) {
      case '/registration/r/demographic':
        this.activeChipIndex = 0;
        break;
      case '/registration/r/attach-file':
        this.activeChipIndex = 1;
        break;
      case '/registration/r/clinical-history':
        this.activeChipIndex = 2;
        break;
      case '/registration/r/consent-form':
        this.activeChipIndex = 3;
        break;
      default:
        this.activeChipIndex = 0; // Default to the first chip if route doesn't match
        break;
    }
  }

}
