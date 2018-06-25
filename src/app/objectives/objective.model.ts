import { Level } from './level.model';

export class Objective {
  public id: string;
  public name: string;
  public levels: Level[];

  constructor(name: string) {
    this.name = name;
    this.id = 'one';
    this.levels = [new Level('Beginner'), new Level('Intermediate')];
  }
}
