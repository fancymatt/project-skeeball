import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatternItemComponent } from './edit-pattern-item.component';

describe('EditPatternItemComponent', () => {
  let component: EditPatternItemComponent;
  let fixture: ComponentFixture<EditPatternItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatternItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatternItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
