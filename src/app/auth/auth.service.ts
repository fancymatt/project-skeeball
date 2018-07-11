import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { UuidService } from '../services/uuid.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private uuidService: UuidService) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: this.uuidService.generateUniqueId()
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: this.uuidService.generateUniqueId()
    };
    this.authChange.next(true);
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
