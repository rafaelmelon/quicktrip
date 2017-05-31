import { Component, NgZone, NgModule, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter} from '@angular/core';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-geo-input',
  templateUrl: './geo-input.component.html',
  styleUrls: ['./geo-input.component.css'],
  providers : [ GoogleMapsAPIWrapper ]
})
export class GeoInputComponent implements OnInit {
  @Input() name: string;
  @Output() selectionCompleted = new EventEmitter<any>();

  @ViewChild("pickupGPlaces")
  public pickupElementRef: ElementRef;

  minutes = [];
  minutesSelect;

  hours = [];
  hoursSelect;

  hourInputDone = false;
  minuteInputDone = false;

  user: any;

  origin: any;
  originPlaceId: any;

  destination: any;
  destinationPlaceId: any;

  //directionsDisplay: any;

  selectedPlace: google.maps.places.PlaceResult;

  constructor(
    public mapsAPILoader: MapsAPILoader,
    public session: SessionService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    this.user = this.session.user;

    this.loadTimeSelect();

    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(this.pickupElementRef.nativeElement, {
        types: ["address"]
      });
      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
    });
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any ) {
    const instance = this;
    autocomplete.addListener("place_changed", () =>   {
      this.ngZone.run( () => {
        instance.selectedPlace = autocomplete.getPlace();
        instance.checkInputReady();
        if(instance.selectedPlace.geometry === undefined){
          return;
        }
        if (mode === 'ORG') {
          this.origin = {
            longitude: instance.selectedPlace.geometry.location.lng(),
            latitude: instance.selectedPlace.geometry.location.lat()
          };
          this.originPlaceId = instance.selectedPlace.place_id;
        } else {
          this.destination = {
            longitude: instance.selectedPlace.geometry.location.lng(),
            latitude: instance.selectedPlace.geometry.location.lat()
          };
          this.destinationPlaceId = instance.selectedPlace.place_id;
        }
        // if(this.directionsDisplay === undefined){
        //   this.mapsAPILoader.load().then(() => {
        //     this.directionsDisplay = new google.maps.DirectionsRenderer;
        //   });
        // }
      });
    });
  }

  private loadTimeSelect(){
    for(var i = 1;i<24;i++){
      this.hours.push({name:i});
    }
    this.hoursSelect = this.hours[0].name

    let count = 0;
    for(var j = 0;j <= 45;count++){
      j = j + 15
      this.minutes.push({name:j});
    }
    this.minutes.unshift(0)
    this.minutes.pop()
    this.minutesSelect = this.minutes[1].name
  }

  private getHour(hour){
    this.hoursSelect = hour;
    this.hourInputDone = true;
    // this.checkInputReady()
  }
  private getMinute(minute){
    this.minutesSelect = minute;
    this.minuteInputDone = true;
    // this.checkInputReady()
  }

  checkInputReady(){
    if(this.minuteInputDone && this.hourInputDone && this.selectedPlace){
      console.log("Send input info")
      this.selectionCompleted.emit({
        hours: this.hoursSelect * 60,
        minutes: this.minutesSelect + this.hoursSelect * 60,
        location: this.selectedPlace
      })
    }
  }
}
