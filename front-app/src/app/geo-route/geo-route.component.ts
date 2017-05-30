import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper }  from 'angular2-google-maps/core';

declare var google: any;

@Component({
  selector: 'sebm-google-map-directions',
  templateUrl: './geo-route.component.html',
  styleUrls: ['./geo-route.component.css']
})
export class GeoRouteComponent implements OnInit {

  constructor (
    private gmapsApi: GoogleMapsAPIWrapper,
  ) {}

  @Input() origin:any ;
  @Input() destination:any;

  public user: any;
  public error: string;

  @Input() originPlaceId:any;
  @Input() destinationPlaceId:any;

  directionsDisplay:any;
  @Input() estimatedTime : any;
  @Input() estimatedDistance : any;

  @Output() eventCompleted = new EventEmitter<any>();
  @Output() eventCompletedData = new EventEmitter<any>();

  globalRoutes;

  control = 0;
  userTime;

  // infoUser : this.user._id;
  // infoNamePlace;
  // infoPlace;

  ngOnInit() {
    this.userTime = (this.destination.minutes - this.origin.minutes) * 60;
    this.updateDirections(100,this.userTime);
  }

  private updateDirections(maxSize,userTime){

    this.originPlaceId = this.origin.location.place_id;
    this.destinationPlaceId = this.destination.location.place_id;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    this.gmapsApi.getNativeMap().then(map => {
      if(!this.originPlaceId || !this.destinationPlaceId ){
        return;
      }


      var directionsService = new google.maps.DirectionsService;
      var servicePlaces = new google.maps.places.PlacesService(map);
      var arrAll = [];
      var showRoutesMap = [];
      var me = this;

      // this.infoNamePlace = this.origin.vicinity;
      // this.infoPlace = this.origin;

      var latLngA = new google.maps.LatLng({lat: this.origin.location.geometry.location.lat(), lng: this.origin.location.geometry.location.lng() });
      var latLngB = new google.maps.LatLng({lat: this.destination.location.geometry.location.lat(), lng: this.destination.location.geometry.location.lng() });

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 7,
          strokeOpacity: 0.9,
          strokeColor:  '#00A63F'
        },
        suppressMarkers: true
      });

      let request = {
        location: latLngA,
        radius: 10000,
        type: ['museum']
      };

      var distance = 0;
      var time = 0;
      var totaltime = 0;

      function attachInfoWindow(marker, legIndex, leg) {
        var open;
        if(leg.opening_hours.open_now){
          open = "Open now"
        }else{
          open = "Close now"
        }
        var infowindow = new google.maps.InfoWindow({
          content: "<div class='windowPoi'><img src='"+leg.photos[0].getUrl({'maxWidth': 80, 'maxHeight': 80})+"'/><div class='windowPoi-info'><span>Stop number: <strong>"+legIndex+"</strong></span><h2 class='h2'>"+leg.name+"</h2><h3 class='h3'>"+open+"</h3><p>"+leg.vicinity+"</p></div></div>"
        });
        google.maps.event.addListener(marker, 'click', function () { //when the marker on map is clicked open info-window
          infowindow.open(map, marker);
        });
      }

      function attachInfoWindowInfo(marker, legIndex, leg) {
        var infowindow = new google.maps.InfoWindow({
          content: "<div class='windowPoi'><div class='windowPoi-info'><h2 class='h2'>"+leg.start_address+"</h2></div></div>"
        });
        google.maps.event.addListener(marker, 'click', function () { //when the marker on map is clicked open info-window
          infowindow.open(map, marker);
        });
      }

      // Create the icon
      var museum = {
        url: '../../assets/img/p-b-2.png',
        scaledSize: new google.maps.Size(40, 40),
      };
      var start = {
        url: '../../assets/img/p-a.png',
        scaledSize: new google.maps.Size(40, 40),
      };

      function doNearbyQuery(servicePlaces, request){
        return new Promise((resolve, reject) => {
          servicePlaces.nearbySearch(request, function(results, status) {
            var wayPlaces = [];
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for(var i = 0; i < results.length; i++){
                wayPlaces.push({
                  location: results[i].geometry.location,
                  stopover: true
                });
              }
              //arrAll.push(results)
            }
            console.log("PASO 1 - FIRST :::::::::::::::::::::::::::::::::::::::::::")
            console.log(results)
            let y = results.slice(0,maxSize-2)
            results = y;
            console.log(wayPlaces)
            let x = wayPlaces.slice(0,maxSize-2)
            wayPlaces = x;
            console.log("PASO 2 - SLICE :::::::::::::::::::::::::::::::::::::::::::")
            console.log(wayPlaces)
            console.log(results)
            arrAll.push(results)
            arrAll.push(wayPlaces)
            resolve(arrAll);
          });
        });
      }

      this.directionsDisplay.setDirections({routes: []});

      doNearbyQuery(servicePlaces, request).then((successMessage) => {
        var TestTest = successMessage[0]
        var optRoute = {
          origin: {placeId : this.originPlaceId },
          destination: {placeId : this.destinationPlaceId },
          travelMode: 'WALKING',
          waypoints: successMessage[1],
          transitOptions: {
            routingPreference: 'LESS_WALKING'
          },
          optimizeWaypoints: true,
        }

        let that = this;
        directionsService.route(optRoute, function(response: any, status: any) {
          that.control++;
          if (status === 'OK') {

            showRoutesMap = TestTest
            var route = response.routes[0];
            let i = 0;
            let totalTime= 0;

            while(totalTime<userTime && i<route.legs.length){
              console.log("1. FINAL ROUTE ///(/(/(/(/(/)))))")
              var theLeg = route.legs[i];
              console.log("este es LEGS ",route.legs.length)
              console.log("este es I ",i)
              time = theLeg.duration.value;
              totalTime += time;
              console.log("Start..........: " + theLeg.start_address);
              console.log("Destination....: " + theLeg.end_address);
              console.log("Location.......: " + theLeg.start_location.lat() + "," + theLeg.start_location.lng());
              console.log("Distance.......: " + theLeg.distance.text);
              console.log("Travel time....: " + me.secondsToTime(theLeg.duration.value));
              console.log("Service time...: " + me.secondsToTime(userTime));
              console.log("POINT time seconds...: " + theLeg.duration.value);
              console.log("TOTAL time seconds...: " + totalTime);
              console.log("------------------------------");
              i++;
            }
            console.log(that.control)
            if(that.control === 1) {
              console.log("PASO 3 - CONTROL 1 :::::::::::::::::::::::::::::::::::::::::::")
              console.log(response)
              that.updateDirections(i,userTime)
            } else if (that.control === 2) {
              console.log("PASO 4 - CONTROL 2 :::::::::::::::::::::::::::::::::::::::::::")
              console.log(response)
              console.log(TestTest)

              me.dataRoute(response);
              me.showRoute(TestTest);

              me.directionsDisplay.setDirections(response);

              var markerOrigin = new google.maps.Marker({
                map: map,
                position: response.routes[0].legs[0].start_location,
                optimized: false,
                icon: start,
                id: 0,
              });
              attachInfoWindowInfo(markerOrigin, 0, response.routes[0].legs[0]);

              var markerDestination = new google.maps.Marker({
                map: map,
                position: response.routes[0].legs.slice(-1)[0].end_location,
                optimized: false,
                icon: start,
                id: 25,
              });
              attachInfoWindowInfo(markerDestination, 25, response.routes[0].legs.slice(-1)[0]);

              for(var m = 0;m < TestTest.length;m++){
                var marker = new google.maps.Marker({
                  map: map,
                  zIndex:99999999,
                  position: TestTest[m].geometry.location,
                  optimized: false,
                  icon: museum,
                  id: m,
                });
                attachInfoWindow(marker, m, TestTest[m]);
              }
            }
          } else {
            if (status == 'ZERO_RESULTS') {
              console.log('No route could be found between the origin and destination.');
            } else if (status == 'UNKNOWN_ERROR') {
              console.log('A directions request could not be processed due to a server error. The request may succeed if you try again.');
            } else if (status == 'REQUEST_DENIED') {
              console.log('This webpage is not allowed to use the directions service.');
            } else if (status == 'OVER_QUERY_LIMIT') {
              console.log('The webpage has gone over the requests limit in too short a period of time.');
            } else if (status == 'NOT_FOUND') {
              console.log('At least one of the origin, destination, or waypoints could not be geocoded.');
            } else if (status == 'INVALID_REQUEST') {
              console.log('The DirectionsRequest provided was invalid.');
            } else {
              console.log("There was an unknown error in your request. Requeststatus: nn"+status);
            }
          }
        });
      });
    });
  }
  public showRoute(route){
    this.eventCompleted.emit(route)
  }

  public dataRoute(data){
    this.eventCompletedData.emit(data)
  }

  public secondsToTime(secs) {
     secs = Math.round(secs);
     var hours = Math.floor(secs / (60 * 60));

     var divisor_for_minutes = secs % (60 * 60);
     var minutes = Math.floor(divisor_for_minutes / 60);

     var divisor_for_seconds = divisor_for_minutes % 60;
     var seconds = Math.ceil(divisor_for_seconds);

     var t = hours + ":" + minutes + ":" + seconds;

     return t;
  }


}
