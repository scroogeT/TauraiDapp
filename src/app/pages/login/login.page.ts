import { Component, OnInit } from '@angular/core';
import {NgGunService} from 'ng-gun';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Storage } from '@capacitor/storage';
import {AuthService} from '../../services/auth/auth.service';
// import 'gun/sea';
// import 'gun/axe';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passType = 'password';
  user: any;

  constructor(private gunService: NgGunService, private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', ]
    });
    // this.user = this.gunService.gun.user();  //.recall({sessionStorage: true});
    // user.get('alias').on(v => console.log(v));
    // this.gunService.gun.on('auth', async (event) => {
    //   console.log(event);
    // });
  }

  get password() { return this.loginForm ?.get('password'); }

  async login() {
    Storage.set({ key: 'TauraiUser', value: this.loginForm.value.username }).then( async  _ => {
      this.authService.loadUsername();
      await this.router.navigateByUrl('/chat-rooms', {replaceUrl: true});
    });

    // this.user.auth(this.loginForm.value.username, this.loginForm.value.password, ({resp}) => {
    //   console.log(resp);
    // });
  }

  signUp() {
    console.log(this.loginForm.value.username);
    // this.user.create(this.loginForm.value.username, this.loginForm.value.password, ({resp}) => {
    //   console.log(resp);
    // });
  }

}
