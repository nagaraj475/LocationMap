import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, map, marker } from 'leaflet';
import * as L from 'leaflet';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
latitude: number = 46.879966;
longitude: number = -121.726909;
countryName: string ="United State of America"
countrylist: any[];
options = {};
layersControl = {};
markerLayers = [];
center=[];
constructor(private lactionService : LocationService) {
  this.locationMap();
 }
locationMap(){
  this.options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Location' })
    ],
    zoom: 4,
    center: latLng(this.latitude, this.longitude)
  };
  this.layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      
    },
    overlays: {
      'Population Density-2015':L.tileLayer.wms('http://sedac.ciesin.columbia.edu/geoserver/wms', {
	     layers: 'gpw-v4:gpw-v4-population-density_2015'
      }),
      'Urban Expansion to 2030':L.tileLayer.wms('http://sedac.ciesin.columbia.edu/geoserver/wms', {
	     layers: 'lulc:lulc-global-grid-prob-urban-expansion-2030'
      })
    }
  }
  this.markerLayers=[
    marker([this.latitude, this.longitude]).bindTooltip(this.countryName).openTooltip()
  ];
  this.center = [this.latitude, this.longitude]
}
  ngOnInit() {
    this.lactionService.getCountriesList().subscribe(data =>{
      this.countrylist = data;
    })
  }
  selectCountry(name) {
    this.lactionService.getLocationDetails(name).subscribe(data =>{
      this.latitude = data[0].latlng[0];
      this.longitude = data[0].latlng[1];
      this.countryName = data[0].name;
      this.locationMap();
    })
}
  

}
