import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { combineLatest, map, switchMap } from 'rxjs';

import { SubmissionsService } from '../../submissions.service';
import { ISubmissionType } from '../../shared/interfaces/submittion.type';
import { EStatuses } from '../../shared/constants/statuses.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  isApiLoaded = false;
  mapSize = null;
  listData: ISubmissionType[] = [];
  currentPage = 0;
  limit = 10;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: 'assets/icons/marker.png'
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private submissionsService: SubmissionsService,
    private cdRef: ChangeDetectorRef,
    private geocoder: MapGeocoder,
  ) {
  }

  ngOnInit(): void {
    this.submissionsService.googleApiLoaded()
      .subscribe(status => {
        this.isApiLoaded = status;
        this.cdRef.detectChanges();
      });
    this.submissionsService.getSubmissions(this.currentPage, this.limit)
      .pipe(
        switchMap(
          (data: ISubmissionType[]) => {
            this.listData = data;
            const addresses = this.listData.map((item) => {
              return this.geocoder.geocode({address: item.customerAddress});
            });
            return combineLatest(addresses)
          }),
        map((response: MapGeocoderResponse[]) => response.map(item => item?.results[0]?.geometry?.location)),
        map((locations) => locations.map(item => ({lat: item?.lat(), lng: item?.lng()}))),
      ).subscribe((geoData) => {
      this.markerPositions = geoData.filter(item => !!item.lat && !!item.lng);
    });
  }

  getStatusClass(status: EStatuses): string {
    return this.submissionsService.getStatusClass(status);
  }

  getStatusMarkClass(status: EStatuses): string {
    return this.submissionsService.getStatusMarkClass(status);
  }
}
