import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getCountriesList(): Observable<any>{
    return this.httpClient.get('https://restcountries.eu/rest/v2/all').pipe( 
      map(response =>{
        return response
      })
    );
  }

  getLocationDetails(inputData : string): Observable<any>{
    let countryName = inputData;
    return this.httpClient.get(`https://restcountries.eu/rest/v2/name/${countryName}`).pipe( 
      map(response =>{
        return response
      })
    );
  }
}
