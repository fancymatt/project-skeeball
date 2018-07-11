import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UuidService {

  generateUniqueId(): string {
    return uuid();
  }

}
