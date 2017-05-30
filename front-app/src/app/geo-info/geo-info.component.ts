import { Component, Input, Output, OnInit } from '@angular/core';
import { SessionService } from './../session.service';

@Component({
  selector: 'app-geo-info',
  templateUrl: './geo-info.component.html',
  styleUrls: ['./geo-info.component.css']
})
export class GeoInfoComponent implements OnInit {

  @Input() userPlaces:any ;
  @Input() userPlacesRoute:any ;

  @Input() origin:any ;
  @Input() destination:any;

  user: any;
  error: string;
  getMapData: any;


  userTime;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.userTime = (this.destination.minutes - this.origin.minutes) * 60;
    this.userTime = this.secondsToTime(this.userTime);

    this.getMapData;
    console.log("HOLA MAPAS Y RUTAS");
    console.log(this.getMapData);
  }

  public getRoutes() {
    this.session.getMapRoute()
      .subscribe(
        (data) => this.getMapData = data,
        (err) => this.error = err
      );
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

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
