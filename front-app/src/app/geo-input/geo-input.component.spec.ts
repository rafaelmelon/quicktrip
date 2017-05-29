import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoInputComponent } from './geo-input.component';

describe('GeoInputComponent', () => {
  let component: GeoInputComponent;
  let fixture: ComponentFixture<GeoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
