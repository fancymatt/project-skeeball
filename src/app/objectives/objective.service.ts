import { Injectable } from '@angular/core';

import { Objective } from './objective.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  objectivesList: Objective[] = [new Objective('Order sushi at a restaurant')]

  constructor() {
  }

  possibleObjectiveLevels(): string[] {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }

  possiblePublishStatus(): string[] {
    return ['Draft', 'Beta', 'Published'];
  }



  get(id: string): Objective {
    return this.objectivesList.find(objective => objective.id === id);
  }


}
