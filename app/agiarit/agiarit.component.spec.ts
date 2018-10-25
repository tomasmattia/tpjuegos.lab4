import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgiaritComponent } from './agiarit.component';

describe('AgiaritComponent', () => {
  let component: AgiaritComponent;
  let fixture: ComponentFixture<AgiaritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgiaritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgiaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
