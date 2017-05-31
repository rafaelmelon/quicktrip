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

  @Input() typeSearch:any;
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

  ngOnInit() {
    this.userTime = (this.destination.minutes - this.origin.minutes) * 60;
    this.updateDirections(100,this.typeSearch,this.userTime);
  }

  private updateDirections(maxSize,type,userTime){

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

      var latLngA = new google.maps.LatLng({lat: this.origin.location.geometry.location.lat(), lng: this.origin.location.geometry.location.lng() });
      var latLngB = new google.maps.LatLng({lat: this.destination.location.geometry.location.lat(), lng: this.destination.location.geometry.location.lng() });

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 5,
          strokeOpacity: 0.8,
          strokeColor:  '#3F41B2'
        },
        suppressMarkers: true
      });

      let request = {
        location: latLngA,
        radius: 10000,
        type: [type]
      };

      var distance = 0;
      var time = 0;
      var totaltime = 0;

      function attachInfoWindow(marker, legIndex, leg) {
        var infowindow = new google.maps.InfoWindow({
          content: "<div class='windowPoi'><img src='"+leg.photos[0].getUrl({'maxWidth': 80, 'maxHeight': 80})+"'/><div class='windowPoi-info'><span>Stop number: <strong>"+legIndex+"</strong></span><h2 class='h2'>"+leg.name+"</h2><p>"+leg.vicinity+"</p></div></div>"
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

      var museum = {
        url: '../../assets/img/p-b-2.png',
      };
      var start = {
        url: '../../assets/img/p-a.png',
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
            }
            let y = results.slice(0,maxSize-2)
            results = y;
            let x = wayPlaces.slice(0,maxSize-2)
            wayPlaces = x;
            arrAll.push(results)
            arrAll.push(wayPlaces)
            resolve(arrAll);
          });
        });
      }

      this.directionsDisplay.setDirections({routes: []});

      doNearbyQuery(servicePlaces, request).then((successMessage) => {
        var responseAll = successMessage[0]
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

            showRoutesMap = responseAll
            var route = response.routes[0];
            let i = 0;
            let totalTime= 0;

            while(totalTime<userTime && i<route.legs.length){
              var theLeg = route.legs[i];
              time = theLeg.duration.value;
              totalTime += time + 1800;
              i++;
            }

            if(that.control === 1) {

              that.updateDirections(i,type,userTime)

            } else if (that.control === 2) {

              me.dataRoute(response);
              me.showRoute(responseAll);

              console.log(response);
              console.log(responseAll);

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

              for(var m = 0;m < responseAll.length;m++){
                var marker = new google.maps.Marker({
                  map: map,
                  zIndex:99999999,
                  position: responseAll[m].geometry.location,
                  optimized: false,
                  icon: museum,
                  id: m,
                });
                attachInfoWindow(marker, m, responseAll[m]);
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

  public dataRoute(data){
    this.eventCompletedData.emit(data)
  }

  public showRoute(route){
    this.eventCompleted.emit(route)
  }

}
