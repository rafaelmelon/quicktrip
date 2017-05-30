import { Component, Input, Output, OnInit } from '@angular/core';

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

  userTime;

  constructor() { }

  ngOnInit() {
    this.userTime = (this.destination.minutes - this.origin.minutes) * 60;
    this.userTime = this.secondsToTime(this.userTime);
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
