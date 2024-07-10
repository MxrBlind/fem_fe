import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewComponent } from './student-new.component';

describe('StudentNewComponent', () => {
  let component: StudentNewComponent;
  let fixture: ComponentFixture<StudentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
