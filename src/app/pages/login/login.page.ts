import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DebugService} from '../../services/debug.service';
import {PlatformService} from '../../services/platform.service';
import {User} from '../../models/User';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  debugMessages: string[] = [];
  loadedUsers: User[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService, private debugService: DebugService,
              private platformService: PlatformService) {
  }

  ngOnInit() {
    this.platformService.loadAppInfos();
    this.subscriptions.push(this.debugService.observe().subscribe(value => {
      this.debugMessages = value;
    }));
    this.formGroup = this.formBuilder.group({
      userName: [null, [Validators.minLength(3), Validators.required]],
      password: [null, [Validators.minLength(3), Validators.required]],
    });
    this.loadedUsers = this.authService.getSavedUsers();
    this.debugService.debug('Loaded Users: ' + this.loadedUsers);
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
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

  deleteAll(): void {
    this.debugService.reset();
  }

  getVersion() {
    return this.platformService.getVersion();
  }

  onUserClick(user: User) {
    this.formGroup.get('userName').setValue(user.name);
    this.formGroup.get('password').setValue(user.password);
  }
}
