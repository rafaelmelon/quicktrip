import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoUserComponent } from './geo-user.component';

describe('GeoUserComponent', () => {
  let component: GeoUserComponent;
  let fixture: ComponentFixture<GeoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
