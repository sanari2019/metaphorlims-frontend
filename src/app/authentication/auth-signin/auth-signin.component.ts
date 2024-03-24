import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/auth/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  public loginForm!: FormGroup;
  public loginObj = new User();
  unauthorizedMessage: string = '';
  constructor(private jwtHelper: JwtHelperService, private fb: FormBuilder, private router: Router, private http: HttpClient, private userService: UserService, private authService: AuthService) { };


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required]
    });
    localStorage.clear();
    localStorage.removeItem('token')

  }

  login() {
    if (this.loginForm.valid) {
      this.loginObj.username = this.loginForm.value.username;
      this.loginObj.password = this.loginForm.value.password;
      this.authService.login(this.loginObj.username, this.loginObj.password).subscribe(
        () => {
          // Redirect to the dashboard or another page on successful login
          const token = localStorage.getItem("token"); // Update key to "token" if that's what you're using

          if (token) {
            if (!this.jwtHelper.isTokenExpired(token)) {
              console.log("Successful")
              this.router.navigate(['/']);
            } else {
              alert("Session Expired. Please log in again");
              this.router.navigate(['/auth']);

            }


          } else {
            console.log('initial login')
            this.router.navigate(['/auth']);

          }


        },
        error => {
          // Handle login error (display error message, etc.)
          console.error('Login error:', error);
          this.unauthorizedMessage = error;
        }
      );
    }
  }




}
