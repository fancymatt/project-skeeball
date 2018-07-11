import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatCardModule,
  MatDialogModule,
  MatSidenavModule, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

import { AppComponent } from './app.component';
import { DataService } from './shared/data.service';
import { LessonListResolverService } from './shared/lesson-list-resolver.service';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminListLessonsComponent } from './admin/admin-lessons/admin-list-lessons/admin-list-lessons.component';
import { AdminCreateLessonComponent } from './admin/admin-lessons/admin-create-lesson/admin-create-lesson.component';
import { AdminEditLessonComponent } from './admin/admin-lessons/admin-edit-lesson/admin-edit-lesson.component';
import { AdminLessonHeaderComponent } from './admin/admin-lessons/admin-lesson-header/admin-lesson-header.component';
import { LessonService } from './shared/lesson.service';
import { AdminListLinesComponent } from './admin/admin-lessons/admin-lines/admin-list-lines/admin-list-lines.component';
import { AdminCreateLineComponent } from './admin/admin-lessons/admin-lines/admin-create-line/admin-create-line.component';
import { LineService } from './shared/lines/line.service';
import { IdGenService } from './shared/id-gen.service';
import { HttpCacheService } from './shared/http-cache.service';
import { CacheInterceptor } from './shared/cache.interceptor';
import { AdminPreviewLessonComponent } from './admin/admin-lessons/admin-preview-lesson/admin-preview-lesson.component';
import { ViewExplanationComponent } from './player/view-explanation/view-explanation.component';
import { DialogChildVocabComponent, ViewExampleComponent } from './player/view-example/view-example.component';
import { ViewQuestionMcComponent } from './player/view-question-mc/view-question-mc.component';
import { AudioService } from './shared/audio.service';
import { AdminCreateVocabComponent } from './admin/admin-vocab/admin-create-vocab/admin-create-vocab.component';
import { AdminListVocabComponent } from './admin/admin-vocab/admin-list-vocab/admin-list-vocab.component';
import { AdminEditVocabComponent } from './admin/admin-vocab/admin-edit-vocab/admin-edit-vocab.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminVocabHeaderComponent } from './admin/admin-vocab/admin-vocab-header/admin-vocab-header.component';
import { ViewFreeAnswerComponent } from './player/view-free-answer/view-free-answer.component';
import { AdminSkillHeaderComponent } from './admin/admin-skills/admin-skill-header/admin-skill-header.component';
import { AdminCreateSkillComponent } from './admin/admin-skills/admin-create-skill/admin-create-skill.component';
import { AdminListSkillsComponent } from './admin/admin-skills/admin-list-skills/admin-list-skills.component';
import { AdminEditSkillComponent } from './admin/admin-skills/admin-edit-skill/admin-edit-skill.component';
import { AdminListTasksComponent } from './admin/admin-skills/admin-tasks/admin-list-tasks/admin-list-tasks.component';
import { AdminEditLevelComponent } from './admin/admin-skills/admin-levels/admin-edit-level/admin-edit-level.component';
import { AdminEditTaskComponent } from './admin/admin-skills/admin-tasks/admin-edit-task/admin-edit-task.component';
import { AdminEditPatternItemComponent } from './admin/admin-skills/admin-pattern-items/admin-edit-pattern-item/admin-edit-pattern-item.component';
import { ChallengeTaskComponent } from './player/challenge-task/challenge-task.component';
import { StandardButtonComponent } from './shared/ui/standard-button/standard-button.component';
import { PlayerComponent } from './player/player/player.component';
import { AdminPreviewTaskComponent } from './admin/admin-skills/admin-tasks/admin-preview-task/admin-preview-task.component';
import { AdminPreviewSkillComponent } from './admin/admin-skills/admin-preview-skill/admin-preview-skill.component';

const appRoutes: Routes = [
  {path: '', component: AdminDashboardComponent, pathMatch: 'full'},
  {path: 'preview/lesson/:id', component: AdminPreviewLessonComponent},
  {path: 'preview/skill/:skill_id/:level_id', component: AdminPreviewSkillComponent},
  {path: 'lessons', component: AdminLessonHeaderComponent, children: [
      {path: '', component: AdminListLessonsComponent, pathMatch: 'full', resolve: { resolvedLessons: LessonListResolverService }},
      {path: 'add', component: AdminCreateLessonComponent},
      {path: ':id', component: AdminEditLessonComponent},
      {path: ':id/add-line', component: AdminCreateLineComponent},
      {path: ':id/preview', component: AdminPreviewLessonComponent}
  ]},
  {path: 'vocabulary', component: AdminVocabHeaderComponent, children: [
      {path: '', component: AdminListVocabComponent, pathMatch: 'full'},
      {path: 'add', component: AdminCreateVocabComponent}
  ]},
  {path: 'skills', component: AdminSkillHeaderComponent, children: [
      {path: '', component: AdminListSkillsComponent, pathMatch: 'full'},
      {path: 'add', component: AdminCreateSkillComponent},
      {path: ':id', component: AdminEditSkillComponent, children: [
        {path: ':id', component: AdminEditTaskComponent}
      ]}
    ]}
  ];

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminListLessonsComponent,
    AdminCreateLessonComponent,
    AdminEditLessonComponent,
    AdminLessonHeaderComponent,
    AdminListLinesComponent,
    AdminCreateLineComponent,
    AdminPreviewLessonComponent,
    ViewExplanationComponent,
    ViewExampleComponent,
    ViewQuestionMcComponent,
    AdminCreateVocabComponent,
    AdminListVocabComponent,
    AdminEditVocabComponent,
    AdminDashboardComponent,
    AdminVocabHeaderComponent,
    ViewFreeAnswerComponent,
    DialogChildVocabComponent,
    AdminSkillHeaderComponent,
    AdminCreateSkillComponent,
    AdminListSkillsComponent,
    AdminEditSkillComponent,
    AdminListTasksComponent,
    AdminEditLevelComponent,
    AdminEditTaskComponent,
    AdminEditPatternItemComponent,
    ChallengeTaskComponent,
    StandardButtonComponent,
    PlayerComponent,
    AdminPreviewTaskComponent,
    AdminPreviewSkillComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    IdGenService,
    LessonService,
    LineService,
    AudioService,
    LessonListResolverService,
    HttpCacheService
  ],
  entryComponents: [DialogChildVocabComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _audioService: AudioService) {
    _audioService.initializeAllSounds();
  }
}
