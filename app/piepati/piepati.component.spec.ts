import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiepatiComponent } from './piepati.component';

describe('PiepatiComponent', () => {
  let component: PiepatiComponent;
  let fixture: ComponentFixture<PiepatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiepatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiepatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
