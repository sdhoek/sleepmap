import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColofonComponent } from './colofon.component';

describe('ColofonComponent', () => {
  let component: ColofonComponent;
  let fixture: ComponentFixture<ColofonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColofonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColofonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
