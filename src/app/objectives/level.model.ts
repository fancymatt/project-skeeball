import { Task } from 'src/app/objectives/task.model';

export class Level {
  name: string;
  publishStatus: string;
  tasks: Task[];

  constructor(name: string) {
  }
}
