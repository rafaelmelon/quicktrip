import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SessionService } from "./session.service";
import { SharedService } from "./shared.service";

import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from './map/map.component';

import {} from '@types/googlemaps';
import { NavbarComponent } from './navbar/navbar.component';
import { GeoInputComponent } from './geo-input/geo-input.component';
import { GeoRouteComponent } from './geo-route/geo-route.component';
import { GeoInfoComponent } from './geo-info/geo-info.component';
import { GeoUserComponent } from './geo-user/geo-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    GeoInputComponent,
    GeoRouteComponent,
    GeoInfoComponent,
    GeoUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC12pLR74uW37zzLMdg3MttBQZ3S-K928k",
      libraries: ["places"]
    })
  ],
  providers: [ SessionService, SharedService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
