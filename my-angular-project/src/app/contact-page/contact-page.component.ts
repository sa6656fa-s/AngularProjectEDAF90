import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  styles: ['h1 { font-weight: normal; }']
})
export class ContactPageComponent implements OnInit {

  map: any;
  view:any;

  constructor() { }
  
  ngOnInit(): void {
    this.createMap();
  }

  createMap(){
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM(),
        })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 4
      }),
    });
  }

}
