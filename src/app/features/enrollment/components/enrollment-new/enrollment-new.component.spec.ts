import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentNewComponent } from './enrollment-new.component';

describe('EnrollmentNewComponent', () => {
  let component: EnrollmentNewComponent;
  let fixture: ComponentFixture<EnrollmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
