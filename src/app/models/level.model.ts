import { Task } from 'src/app/models/task.model';

export class Level {
  id: string;
  name: string;
  publishStatus: string;
  tasks: Task[];

  constructor(name: string) {
  }
}
