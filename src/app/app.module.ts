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

import { HeaderComponent } from './header/header.component';
import { LessonListComponent } from './lessons/lesson-list/lesson-list.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';
import { EditLessonComponent } from './lessons/edit-lesson/edit-lesson.component';
import { LessonShellComponent } from './lessons/lesson-shell/lesson-shell.component';
import { LessonService } from './lessons/lesson.service';
import { LineListComponent } from './lines/line-list/line-list.component';
import { AddLineComponent } from './lines/add-line/add-line.component';
import { LineService } from './lines/line.service';
import { IdGenService } from './shared/id-gen.service';
import { HttpCacheService } from './shared/http-cache.service';
import { CacheInterceptor } from './shared/cache.interceptor';
import { ViewLessonComponent } from './lessons/view-lesson/view-lesson.component';
import { ViewExplanationComponent } from './lines/view-explanation/view-explanation.component';
import { DialogChildVocabComponent, ViewExampleComponent } from './lines/view-example/view-example.component';
import { ViewQuestionMcComponent } from './lines/view-question-mc/view-question-mc.component';
import { AudioService } from './shared/audio.service';
import { AddVocabComponent } from './vocab/add-vocab/add-vocab.component';
import { BrowseVocabComponent } from './vocab/browse-vocab/browse-vocab.component';
import { ViewVocabComponent } from './vocab/view-vocab/view-vocab.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VocabShellComponent } from './vocab/vocab-shell/vocab-shell.component';
import { ViewFreeAnswerComponent } from './lines/view-free-answer/view-free-answer.component';
import { ObjectiveShellComponent } from './objectives/objective-shell/objective-shell.component';
import { AddObjectiveComponent } from './objectives/add-objective/add-objective.component';
import { BrowseObjectivesComponent } from './objectives/browse-objectives/browse-objectives.component';
import { ViewObjectiveComponent } from './objectives/view-objective/view-objective.component';
import { ManageTaskListComponent } from './objectives/manage-task-list/manage-task-list.component';
import { ManageLevelListComponent } from './objectives/manage-level-list/manage-level-list.component';
import { ViewTaskComponent } from './objectives/view-task/view-task.component';

const appRoutes: Routes = [
  {path: '', component: AdminDashboardComponent, pathMatch: 'full'},
  {path: 'lessons', component: LessonShellComponent, children: [
      {path: '', component: LessonListComponent, pathMatch: 'full', resolve: { resolvedLessons: LessonListResolverService }},
      {path: 'add', component: AddLessonComponent},
      {path: ':id', component: EditLessonComponent},
      {path: ':id/add-line', component: AddLineComponent},
      {path: ':id/preview', component: ViewLessonComponent}
  ]},
  {path: 'vocabulary', component: VocabShellComponent, children: [
      {path: '', component: BrowseVocabComponent, pathMatch: 'full'},
      {path: 'add', component: AddVocabComponent}
  ]},
  {path: 'objectives', component: ObjectiveShellComponent, children: [
      {path: '', component: BrowseObjectivesComponent, pathMatch: 'full'},
      {path: 'add', component: AddObjectiveComponent},
      {path: ':id', component: ViewObjectiveComponent, children: [
        {path: ':id', component: ViewTaskComponent}
      ]}
    ]}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonListComponent,
    AddLessonComponent,
    EditLessonComponent,
    LessonShellComponent,
    LineListComponent,
    AddLineComponent,
    ViewLessonComponent,
    ViewExplanationComponent,
    ViewExampleComponent,
    ViewQuestionMcComponent,
    AddVocabComponent,
    BrowseVocabComponent,
    ViewVocabComponent,
    AdminDashboardComponent,
    VocabShellComponent,
    ViewFreeAnswerComponent,
    DialogChildVocabComponent,
    ObjectiveShellComponent,
    AddObjectiveComponent,
    BrowseObjectivesComponent,
    ViewObjectiveComponent,
    ManageTaskListComponent,
    ManageLevelListComponent,
    ViewTaskComponent
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
