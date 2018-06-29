import { Task } from 'src/app/objectives/task.model';

export class Level {
  id: string;
  name: string;
  publishStatus: string;
  tasks: Task[];

  constructor(name: string) {
  }
}
