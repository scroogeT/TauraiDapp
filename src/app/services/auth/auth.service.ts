import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Storage } from '@capacitor/storage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentUsername = null;

  constructor(private router: Router) {
    this.loadUsername();
  }

  loadUsername() {
    Storage.get({key: 'TauraiUser'}).then(async res => {
      if (res.value) {
        this.currentUsername = res.value;
        this.isAuthenticated.next(true);
      } else {
        this.isAuthenticated.next(false);
        await this.router.navigateByUrl('/login', {replaceUrl: true});
      }
    }).catch(async error => {
      this.isAuthenticated.next(false);
      await this.router.navigateByUrl('/login', {replaceUrl: true});
    });
  }

  async getUsername() {
    return Storage.get({key: 'TauraiUser'});
  }

  async logout() {
    Storage.remove({key: 'TauraiUser'}).then(async _ => {
      this.currentUsername = null;
      this.isAuthenticated.next(false);
      await this.router.navigateByUrl('/login', {replaceUrl: true});
    });
  }
}
