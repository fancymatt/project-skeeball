import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LessonListComponent } from './lessons/lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonListComponent,
    LessonDetailComponent
  ],
  imports: [
    [BrowserModule, BrowserAnimationsModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatCardModule]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
