import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {PasswordValidation} from '../shared/matchPassword.validation';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  private email: FormControl;
  private password: FormControl;
  private confirmPassword: FormControl;

  constructor(
    private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password  = new FormControl(null, [Validators.required, Validators.maxLength(8)]);
    this.confirmPassword  = new FormControl(null, [
      Validators.required,
      Validators.maxLength(8)
    ]);
    this.regForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, PasswordValidation.MatchPassword);
  }
  viewLogin() {
    this.router.navigate(['auth/login']);
  }
  postRegister(data) {
    if (this.regForm.touched && this.regForm.dirty
    && (
      (!this.regForm.controls.email.errors)
      && (!this.regForm.controls.password.errors)
      && (!this.regForm.controls.confirmPassword.errors)
    )) {
      this.authService.createUser(data.email, data.password).subscribe(res => {
        console.log(res);
        if (res) {
          $.notify({
            icon: 'notifications',
            message: 'Please see your email for activation link.'
          });
          this.router.navigate(['auth/login']);
        }
      }, err => {
        $.notify({
          icon: 'notifications',
          message: err
        }, {
          type: 'danger',
        });
      }); // temporarily disable register function to test others
    }
  }

}

