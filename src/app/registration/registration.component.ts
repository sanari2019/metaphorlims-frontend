import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  collapseShow = "hidden";
  panelOpenState = true;


  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

}
