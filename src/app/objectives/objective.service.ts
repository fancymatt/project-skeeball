import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Objective } from './objective.model';
import { DataService } from '../shared/data.service';
import { Task } from './task.model';
import { Vocab } from '../vocab/vocab.model';
import { VocabService } from '../vocab/vocab.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  _selectedObjective: Objective;
  selectedTask: Task = new Task('Task not found');
  selectedObjectiveVocabulary: Vocab[];

  get selectedObjective() {;
    return this._selectedObjective;
  }

  set selectedObjective(obj: Objective) {
    this._selectedObjective = obj;
  }

  constructor(private dataService: DataService, private vocabService: VocabService) {
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
