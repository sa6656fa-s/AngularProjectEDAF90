import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import {Icon, Style} from 'ol/style';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  styles: ['h1 { font-weight: normal; }']
})
export class ContactPageComponent implements OnInit {

  map: any;
  view:any;
  pos: any;

  constructor() { }
  
  ngOnInit(): void {
    this.createMap();
  }

  createMap(){
    var osm = new Tile({
      source: new OSM()
    });

    this.pos = new Feature({
      geometry: new Point(olProj.fromLonLat( [13.210362, 55.711163]))
    });

    this.pos.setStyle(new Style({
      image: new Icon({
        color: '#FFFFFF',
        src: 'assets/video-player-movie-svgrepo-com.svg',
        imgSize: [30,25]


      })
    }))
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [this.pos]
        })
        
      });
    
    this.map = new Map({
      target: 'map',
      layers: [
        osm,
        vectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([ 13.210362,55.711163]),
        zoom: 17
      }),
    });

    
  }

}
