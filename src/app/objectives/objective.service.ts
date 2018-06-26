import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Objective } from './objective.model';
import { DataService } from '../shared/data.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  selectedObjective: Objective;
  selectedTask: Task = new Task('Task not found');

  constructor(private dataService: DataService) {
  }

  possibleObjectiveLevels(): string[] {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }

  possiblePublishStatus(): string[] {
    return ['Draft', 'Beta', 'Published'];
  }

  patternItemTypes(): string[] {
    return ['Static', 'Slot'];
  }

  get(id: string): Observable<Objective> {
    return this.dataService.getObjective(id);
  }

  getAll(): Observable<Objective[]> {
    return this.dataService.getAllObjectives();
  }

  create(newObjective: Objective): Observable<Objective> {
    return this.dataService.createObjective(newObjective);
  }


  update(updatedObjective: Objective): Observable<void> {
    return this.dataService.updateObjective(updatedObjective);
  }

  delete(deletedObjective: Objective): Observable<void> {
    return this.dataService.deleteObjective(deletedObjective);
  }

}
