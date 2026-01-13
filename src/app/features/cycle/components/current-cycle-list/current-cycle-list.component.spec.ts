import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCycleListComponent } from './current-cycle-list.component';

describe('CurrentCycleListComponent', () => {
  let component: CurrentCycleListComponent;
  let fixture: ComponentFixture<CurrentCycleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentCycleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentCycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
