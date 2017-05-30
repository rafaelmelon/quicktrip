import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input, Output  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { SessionService } from '../session.service';

declare var google:any;
declare var $:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers : [ GoogleMapsAPIWrapper ]
})

export class MapComponent implements OnInit {

  public saveTest: string;

  public user: any;
  public error: string;
  public userPlaces: any;
  public userPlacesRoute: any;

  public placeInfo = {
    user: '',
    place: '',
    mapBD: []
  };

  public latitude: number;
  public longitude: number;

  public zoom: number;
  public iconurl: string;
  public mapCustomStyles : any;

  origin;
  timeOrigin;
  location;
  destination;
  timeDestination;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef : ElementRef,
    private session: SessionService
  ) {}

  ngOnInit() {

    $('[data-toggle="offcanvas"]').click(function () {
      $('.row-offcanvas').toggleClass('active')
    });

    $('.js-btn-showmap').click(function () {
      $('.g-route').addClass('v-none')
      $('.g-map').removeClass('v-hidden')
    });

    this.user = this.session.user;

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.iconurl = "../../assets/img/p-c.png";
    this.setCurrentPosition();
  }


  private setPickUpLocation( place:any ) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private getMapCustomStyles() {
    // Write your Google Map Custom Style Code Here.
  }

  originSelected(originAll){
    this.origin = originAll;
    console.log(this.origin);
  }

  destinationSelected(destinationAll){
    this.destination = destinationAll;
    this.location = destinationAll.location;
    console.log(this.destination);
  }

  showRoute(route){
    this.userPlaces = route;
  }

  dataRoute(data){
    this.userPlacesRoute = data;
  }

  setMapRoute(){
    this.placeInfo.user = this.user._id;
    this.placeInfo.place = this.location.vicinity;

    for(var i = 0; i < this.userPlaces.length;i++){
      this.placeInfo.mapBD.push(
        {
          icon: this.userPlaces[i].icon,
          name: this.userPlaces[i].name,
          vicinity: this.userPlaces[i].vicinity,
        }
      );
    }

    console.log(this.placeInfo)
    this.session.postMapRoute(this.placeInfo)
    .subscribe(
      (user) => this.successCb(user),
      (err) => this.errorCb(err)
    );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }


}
