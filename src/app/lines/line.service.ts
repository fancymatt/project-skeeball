import { Injectable } from '@angular/core';
import { Line } from './line.model';

@Injectable()
export class LineService {
  private lines: Line[] = [];

  private lineTypes: string[] = [
    'Explanation', 'Example'
  ];

  getAllLineTypes() {
    return this.lineTypes;
  }

}
