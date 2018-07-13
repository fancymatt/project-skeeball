import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-player-play-lesson-queue',
  templateUrl: './player-play-lesson-queue.component.html',
  styleUrls: ['./player-play-lesson-queue.component.css']
})
export class PlayerPlayLessonQueueComponent implements OnInit {
  playerContent: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private skillService: SkillService) { }


  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
    const skillId = this.activatedRoute.snapshot.params.skill_id;
    const levelId = this.activatedRoute.snapshot.params.level_id;
    const taskId = this.activatedRoute.snapshot.params.task_id;

    this.skillService.get(skillId)
      .subscribe(data => {
        console.log('Data received from skillService');
        console.log(data);
        const selectedLevel = data.levels.find(level => level.id === levelId);
        const selectedTask = selectedLevel.tasks.find(task => task.id === taskId);
        selectedTask.lessons.forEach(lesson => this.playerContent.push({'type': 'lesson', 'id': lesson}));
        this.playerContent.push({'type': 'task', 'skillId': skillId, 'levelId': levelId, 'taskId': taskId});
        console.log(this.playerContent);
      },
        err => console.error(err));
  }

}
