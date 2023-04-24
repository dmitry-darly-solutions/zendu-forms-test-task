import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { SubmissionsService } from './submissions.service';
import { IFormType } from './shared/interfaces/form.type';
import { EStatuses } from './shared/constants/statuses.enum';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  currentTab = '';
  forms: IFormType[] = [];
  selectedForm = 'Select Form';
  statuses: EStatuses[] = [EStatuses.SUCCESS, EStatuses.DEFAULT, EStatuses.DANGER];
  selectedStatus = 'Select Status';
  date = '';

  constructor(private router: Router, private submissionsService: SubmissionsService) {
    this.currentTab = this.router.url.split('/')[2];
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.currentTab = this.router.url.split('/')[2];
    });
    this.submissionsService.getForms().subscribe(forms => this.forms = forms);
  }

  export(): void {
    this.submissionsService.downloadSubmissions();
  }
}
