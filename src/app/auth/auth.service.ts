import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UuidService } from '../services/uuid.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private uuidService: UuidService,
              private router: Router,
              private dataService: DataService) { }

  registerUser(authData: AuthData) {
    const newUser = new User(authData.username);
    newUser.password = authData.password;
    newUser.id = this.uuidService.generateUniqueId();

    this.dataService.registerUser(newUser)
      .subscribe(
        data => {
          this.user = data;
          this.authSuccessfully();
        },
        err => console.error(err)
      );
  }

  login(authData: AuthData) {
    this.dataService.loginUser(authData)
      .subscribe(
        data => {
          if (data) {
            this.user = data;
            this.authSuccessfully();
          } else {
            this.user = null;
          }
        },
        err => console.error(err)
      );
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

  isAdmin() {
    if (this.user) {
      return this.user.isAdmin === true;
    }
    return false;

  }
}
