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
import { DataService } from './services/data.service';
import { LessonService } from './services/lesson.service';
import { LessonListResolverService } from './services/lesson-list-resolver.service';
import { LineService } from './services/line.service';
import { UuidService } from './services/uuid.service';
import { HttpCacheService } from './services/http-cache.service';
import { AudioService } from './services/audio.service';
import { AuthService } from './auth/auth.service';
import { CacheInterceptorModel } from './models/cache-interceptor.model';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminListLessonsComponent } from './admin/admin-lessons/admin-list-lessons/admin-list-lessons.component';
import { AdminCreateLessonComponent } from './admin/admin-lessons/admin-create-lesson/admin-create-lesson.component';
import { AdminEditLessonComponent } from './admin/admin-lessons/admin-edit-lesson/admin-edit-lesson.component';
import { AdminLessonHeaderComponent } from './admin/admin-lessons/admin-lesson-header/admin-lesson-header.component';
import { AdminListLinesComponent } from './admin/admin-lessons/admin-lines/admin-list-lines/admin-list-lines.component';
import { AdminCreateLineComponent } from './admin/admin-lessons/admin-lines/admin-create-line/admin-create-line.component';
import { AdminPreviewLessonComponent } from './admin/admin-lessons/admin-preview-lesson/admin-preview-lesson.component';
import { AdminCreateVocabComponent } from './admin/admin-vocab/admin-create-vocab/admin-create-vocab.component';
import { AdminListVocabComponent } from './admin/admin-vocab/admin-list-vocab/admin-list-vocab.component';
import { AdminEditVocabComponent } from './admin/admin-vocab/admin-edit-vocab/admin-edit-vocab.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminVocabHeaderComponent } from './admin/admin-vocab/admin-vocab-header/admin-vocab-header.component';
import { AdminSkillHeaderComponent } from './admin/admin-skills/admin-skill-header/admin-skill-header.component';
import { AdminCreateSkillComponent } from './admin/admin-skills/admin-create-skill/admin-create-skill.component';
import { AdminListSkillsComponent } from './admin/admin-skills/admin-list-skills/admin-list-skills.component';
import { AdminEditSkillComponent } from './admin/admin-skills/admin-edit-skill/admin-edit-skill.component';
import { AdminListTasksComponent } from './admin/admin-skills/admin-tasks/admin-list-tasks/admin-list-tasks.component';
import { AdminEditLevelComponent } from './admin/admin-skills/admin-levels/admin-edit-level/admin-edit-level.component';
import { AdminEditPatternItemComponent } from './admin/admin-skills/admin-pattern-items/admin-edit-pattern-item/admin-edit-pattern-item.component';
import { AdminPreviewTaskComponent } from './admin/admin-skills/admin-tasks/admin-preview-task/admin-preview-task.component';
import { AdminEditTaskComponent } from './admin/admin-skills/admin-tasks/admin-edit-task/admin-edit-task.component';
import { AdminPreviewSkillComponent } from './admin/admin-skills/admin-preview-skill/admin-preview-skill.component';
import { PlayerPlayLineExplanationComponent } from './player/player-play-line-explanation/player-play-line-explanation.component';
import { DialogChildVocabComponent, PlayerPlayLineExampleComponent } from './player/player-play-line-example/player-play-line-example.component';
import { PlayerPlayLineQuestionMcComponent } from './player/player-play-line-question-mc/player-play-line-question-mc.component';
import { PlayerPlayLineFreeAnswerComponent } from './player/player-play-line-free-answer/player-play-line-free-answer.component';
import { PlayerPlayTaskComponent } from './player/player-play-task/player-play-task.component';
import { StandardButtonComponent } from './ui-elements/standard-button/standard-button.component';
import { PlayerComponent } from './player/player.component';
import { UserHeaderComponent } from './frontend/user-header/user-header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: UserHeaderComponent, pathMatch: 'full', children: [] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminHeaderComponent, children: [
      { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
      { path: 'lessons', component: AdminLessonHeaderComponent, children: [
          { path: '', component: AdminListLessonsComponent, pathMatch: 'full' },
          { path: 'add', component: AdminCreateLessonComponent },
          { path: ':id', component: AdminEditLessonComponent },
          { path: ':id/add-line', component: AdminCreateLineComponent },
          { path: ':id/preview', component: AdminPreviewLessonComponent }
        ]
      },
      { path: 'vocabulary', component: AdminVocabHeaderComponent, children: [
          { path: '', component: AdminListVocabComponent, pathMatch: 'full' },
          { path: 'add', component: AdminCreateVocabComponent }
        ]
      },
      { path: 'skills', component: AdminSkillHeaderComponent, children: [
          { path: '', component: AdminListSkillsComponent, pathMatch: 'full' },
          { path: 'add', component: AdminCreateSkillComponent },
          { path: ':id', component: AdminEditSkillComponent, children: [
              { path: ':id', component: AdminEditTaskComponent },
              { path: ':id/preview', component: AdminPreviewTaskComponent }
            ]
          },
          { path: ':id/preview', component: AdminPreviewSkillComponent }
        ]
      }
    ]
  }
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
    AdminCreateVocabComponent,
    AdminListVocabComponent,
    AdminEditVocabComponent,
    AdminDashboardComponent,
    AdminVocabHeaderComponent,
    AdminSkillHeaderComponent,
    AdminCreateSkillComponent,
    AdminListSkillsComponent,
    AdminEditSkillComponent,
    AdminListTasksComponent,
    AdminEditLevelComponent,
    AdminEditTaskComponent,
    AdminEditPatternItemComponent,
    AdminPreviewTaskComponent,
    AdminPreviewSkillComponent,
    PlayerPlayLineExplanationComponent,
    PlayerPlayLineExampleComponent,
    PlayerPlayLineQuestionMcComponent,
    PlayerPlayLineFreeAnswerComponent,
    DialogChildVocabComponent,
    PlayerPlayTaskComponent,
    StandardButtonComponent,
    PlayerComponent,
    UserHeaderComponent,
    LoginComponent,
    SignupComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorModel, multi: true},
    UuidService,
    LessonService,
    LineService,
    AudioService,
    AuthService,
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
