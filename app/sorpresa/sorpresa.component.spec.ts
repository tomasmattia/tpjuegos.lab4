import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorpresaComponent } from './sorpresa.component';

describe('SorpresaComponent', () => {
  let component: SorpresaComponent;
  let fixture: ComponentFixture<SorpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
