import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoRouteComponent } from './geo-route.component';

describe('GeoRouteComponent', () => {
  let component: GeoRouteComponent;
  let fixture: ComponentFixture<GeoRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
