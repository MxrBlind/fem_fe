import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleNewComponent } from './cycle-new.component';

describe('CycleNewComponent', () => {
  let component: CycleNewComponent;
  let fixture: ComponentFixture<CycleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CycleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
