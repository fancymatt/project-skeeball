import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Skill } from './skill.model';
import { DataService } from '../data.service';
import { Task } from './task.model';
import { VocabService } from '../vocab.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  _selectedSkill: Skill;
  selectedTask: Task = new Task('Task not found');

  get selectedSkill() {;
    return this._selectedSkill;
  }

  set selectedSkill(skill: Skill) {
    this._selectedSkill = skill;
  }

  constructor(private dataService: DataService, private vocabService: VocabService) {
  }


  possibleSkillLevels(): string[] {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }

  possiblePublishStatus(): string[] {
    return ['Draft', 'Beta', 'Published'];
  }

  patternItemTypes(): string[] {
    return ['Static', 'Slot'];
  }

  get(id: string): Observable<Skill> {
    return this.dataService.getSkill(id);
  }

  getAll(): Observable<Skill[]> {
    return this.dataService.getAllSkills();
  }

  create(newSkill: Skill): Observable<Skill> {
    return this.dataService.createSkill(newSkill);
  }


  update(updatedSkill: Skill): Observable<void> {
    return this.dataService.updateSkill(updatedSkill);
  }

  delete(deletedSkill: Skill): Observable<void> {
    return this.dataService.deleteSkill(deletedSkill);
  }

}
