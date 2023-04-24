import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, take } from 'rxjs';

import { ISubmissionType } from './shared/interfaces/submittion.type';
import { environment } from '../../../environments/environment';
import { EStatuses } from './shared/constants/statuses.enum';
import { IFormType } from './shared/interfaces/form.type';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
   private API = {
     SUBMISSIONS: 'submissions',
     FORMS: 'forms',
     GOOGLE: 'https://maps.googleapis.com/maps/api/js',
   };
   private isGoogleApiLoaded = false;

  constructor(private http: HttpClient) {
  }

  getSubmissions(_start: number, _limit: number): Observable<ISubmissionType[]> {
    return this.http.get<ISubmissionType[]>(
      `${environment.API_PATH}/${this.API.SUBMISSIONS}`,
      {params: {_start, _limit}}
      ).pipe(take(1));
  }

  getAllSubmissions(): Observable<ISubmissionType[]> {
    return this.http.get<ISubmissionType[]>(
      `${environment.API_PATH}/${this.API.SUBMISSIONS}`,
    ).pipe(take(1));
  }

  getSubmissionsAmount(): Observable<number> {
    return this.getAllSubmissions().pipe(map(submissions => submissions.length));
  }

  downloadSubmissions(): void {
    this.getAllSubmissions().subscribe((submissions) => {
      const blob = new Blob([JSON.stringify(submissions)], {
        type: 'application/json'
      });
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = 'submissions.json';
      a.click();
      URL.revokeObjectURL(objectUrl);
      a.remove();
    });
  }

  googleApiLoaded(): Observable<boolean> {
    if (this.isGoogleApiLoaded) return of(this.isGoogleApiLoaded);
    return this.http.jsonp(`${this.API.GOOGLE}?key=${environment.GOOGLE_MAP_KEY}`, 'callback')
      .pipe(
        map(() => {
          this.isGoogleApiLoaded = true;
          return this.isGoogleApiLoaded;
        }),
        catchError(() => of(false)),
      );
  }

  getForms(): Observable<IFormType[]> {
    return this.http.get<IFormType[]>(`${environment.API_PATH}/${this.API.FORMS}`).pipe(take(1));
  }

  getStatusClass(status: EStatuses): string {
    if (status === EStatuses.SUCCESS) {
      return 'text-status-green border-status-green bg-status-green-bg';
    } else if (status === EStatuses.DANGER) {
      return 'text-status-red border-status-red';
    } else if (status === EStatuses.DEFAULT) {
      return 'text-status-gray border-status-grey bg-status-gray-bg';
    } else {
      return 'text-status-gray border-status-grey bg-status-gray-bg';
    }
  }

  getStatusMarkClass(status: EStatuses): string {
    if (status === EStatuses.SUCCESS) {
      return 'bg-status-green';
    } else if (status === EStatuses.DANGER) {
      return 'bg-status-red';
    } else if (status === EStatuses.DEFAULT) {
      return 'bg-status-gray';
    } else {
      return 'bg-status-gray';
    }
  }
}
