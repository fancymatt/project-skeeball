import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewObjectiveComponent } from './preview-objective.component';

describe('PreviewObjectiveComponent', () => {
  let component: PreviewObjectiveComponent;
  let fixture: ComponentFixture<PreviewObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
