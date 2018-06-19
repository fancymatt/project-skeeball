import { Injectable } from '@angular/core';
import { Line } from './line.model';

@Injectable()
export class LineService {
  private lines: Line[] = [];

  private lineTypes: string[] = [
    'Explanation', 'Example', 'Multiple Choice', 'Free Answer'
  ];

  getAllLineTypes() {
    return this.lineTypes;
  }

}
