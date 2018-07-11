import { Task } from 'src/app/shared/skills/task.model';

export class Level {
  id: string;
  name: string;
  publishStatus: string;
  tasks: Task[];

  constructor(name: string) {
  }
}
