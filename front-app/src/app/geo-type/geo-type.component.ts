import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geo-type',
  templateUrl: './geo-type.component.html',
  styleUrls: ['./geo-type.component.css']
})
export class GeoTypeComponent implements OnInit {

  @Output() selectionCompletedType = new EventEmitter<any>();

  typeSelect;

  constructor() { }

  ngOnInit() {
  }

  private getType(type){
    this.typeSelect = type;
    this.selectionCompletedType.emit(this.typeSelect)
  }

}
