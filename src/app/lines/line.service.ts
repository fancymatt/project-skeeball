import { Injectable } from '@angular/core';

import { Line } from './line.model';

@Injectable()
export class LineService {
  private _lineTypes: string[] = [
    'Explanation', 'Example', 'Multiple Choice', 'Free Answer'
  ];

  get lineTypes(): string[] {
    return this._lineTypes;
  }

}
