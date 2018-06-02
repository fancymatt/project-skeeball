import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';


@Injectable()
export class IdGenService {

  generateUniqueId(): string {
    return uuid();
  }

}
