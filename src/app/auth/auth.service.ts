import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UuidService } from '../services/uuid.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private uuidService: UuidService, private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: this.uuidService.generateUniqueId()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: this.uuidService.generateUniqueId()
    };
    this.authSuccessfully();
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return this.user;
  }

  isAuth() {
    return this.user != null;
  }
}
