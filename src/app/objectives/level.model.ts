import { Task } from 'src/app/objectives/task.model';

export class Level {
  name: string;
  publishStatus: string;
  tasks: Task[];

  constructor(name: string) {
    if (name === 'Beginner' || name === 'Intermediate' || name === 'Advanced' ) {
      this.name = name;
    } else {
      this.name = 'Beginner';
    }
    this.tasks = [
      new Task('Get the chef\'s attention'),
      new Task('Politely ask for sushi'),
      new Task('Ask if an item is in stock')
    ];
    this.publishStatus = 'Draft';
  }
}
