import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabShellComponent } from './vocab-shell.component';

describe('VocabShellComponent', () => {
  let component: VocabShellComponent;
  let fixture: ComponentFixture<VocabShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
