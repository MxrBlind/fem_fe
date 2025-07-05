import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectNewComponent } from './subject-new.component';

describe('SubjectNewComponent', () => {
  let component: SubjectNewComponent;
  let fixture: ComponentFixture<SubjectNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
