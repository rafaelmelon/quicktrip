import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoTypeComponent } from './geo-type.component';

describe('GeoTypeComponent', () => {
  let component: GeoTypeComponent;
  let fixture: ComponentFixture<GeoTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
