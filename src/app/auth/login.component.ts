import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-auth-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginInvalid = false;
  loginForm: FormGroup;
  private username: FormControl;
  private password: FormControl;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.maxLength(8)]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  postLogin(data) {
    if (this.loginForm.valid) {
      this.authService.loginUser(data.username, data.password).map((res) => {
        if (!res) {
          $.notify({
            icon: 'notifications',
            message: 'There is problem logging you in.'
          }, {
            type: 'danger',
          });
        } else {
          console.log('success');
          this.router.navigateByUrl(this.returnUrl);
        }
      }).subscribe(res => {
        if (!res) {
          this.loginInvalid = true;
        }
      }, err => {
        console.log('error', err);
      });
    }
  }

  viewRegister() {
    this.router.navigate(['auth/register']);
  }

}
