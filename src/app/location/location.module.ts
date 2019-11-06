import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { LocationService } from './services/location.service';

@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    LeafletModule,
    FormsModule
  ],
  providers: [
    LocationService
  ],
  exports:[LocationComponent]
})
export class LocationModule { }
