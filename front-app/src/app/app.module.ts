import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SessionService } from "./session.service";
import { SharedService } from "./shared.service";

import { AgmCoreModule } from 'angular2-google-maps/core';

import {} from '@types/googlemaps';

import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { GeoInputComponent } from './geo-input/geo-input.component';
import { GeoRouteComponent } from './geo-route/geo-route.component';
import { GeoInfoComponent } from './geo-info/geo-info.component';
import { GeoUserComponent } from './geo-user/geo-user.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'geomap',  component: MapComponent },
  { path: 'geoplace',  component: GeoUserComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    GeoInputComponent,
    GeoRouteComponent,
    GeoInfoComponent,
    GeoUserComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC12pLR74uW37zzLMdg3MttBQZ3S-K928k",
      libraries: ["places"]
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [ SessionService, SharedService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
