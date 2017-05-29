import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoInfoComponent } from './geo-info.component';

describe('GeoInfoComponent', () => {
  let component: GeoInfoComponent;
  let fixture: ComponentFixture<GeoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
