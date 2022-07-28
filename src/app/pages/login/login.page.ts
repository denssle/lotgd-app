import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DebugService} from '../../services/debug.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  debugMessages: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private debug: DebugService) {
  }

  ngOnInit() {
    this.debug.observe().subscribe(value => {
      this.debugMessages = value;
    });
    this.formGroup = this.formBuilder.group({
      userName: [null, [Validators.minLength(3), Validators.required]],
      password: [null, [Validators.minLength(3), Validators.required]],
    });
  }

  ionViewWillLeave(): void {
    this.formGroup.reset();
  }

  onLoginClick(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.get('userName').value, this.formGroup.get('password').value);
    }
  }

  loginDisabled(): boolean {
    return this.formGroup.invalid;
  }

  inputInvalid(controlName: string): boolean {
    return this.formGroup.get(controlName).invalid && this.formGroup.get(controlName).dirty;
  }
}
