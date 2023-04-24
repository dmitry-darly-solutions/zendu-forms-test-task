import { Component } from '@angular/core';

import { ISubmissionType } from '../../shared/interfaces/submittion.type';
import { EStatuses } from '../../shared/constants/statuses.enum';
import { SubmissionsService } from '../../submissions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  listData: ISubmissionType[] = [];
  currentPage = 0;
  limit = 10;
  amount = 0;

  constructor(private submissionsService: SubmissionsService) {
    this.loadPage(this.currentPage);
    this.submissionsService.getSubmissionsAmount()
      .subscribe(amount => this.amount = amount);
  }

  getStatusClass(status: EStatuses): string {
    return this.submissionsService.getStatusClass(status);
  }

  getStatusMarkClass(status: EStatuses): string {
    return this.submissionsService.getStatusMarkClass(status);
  }

  loadPage(pageNr: number) {
    this.currentPage = pageNr;
    this.submissionsService.getSubmissions(this.currentPage, this.limit)
      .subscribe((data: ISubmissionType[]) => {
        this.listData = data;
      });
  }

  get numberOfElements(): string {
    const start = this.currentPage * this.limit + 1;
    const end = (this.currentPage + 1) * this.limit;
    return `${start}-${Math.min(end, this.amount)}`;
  }

  get pageLimit(): number {
    return Math.ceil(this.amount / this.limit);
  }

}
