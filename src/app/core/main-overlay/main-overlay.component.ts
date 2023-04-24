import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-overlay',
  templateUrl: './main-overlay.component.html',
  styleUrls: ['./main-overlay.component.scss']
})
export class MainOverlayComponent {
  public navLinks = [
    {title: 'Forms', path: 'forms', icon: 'icon-format-ist-bulleted', 'icon-size': '15px'},
    {title: 'Customers', path: 'customers', icon: 'icon-people', 'icon-size': '14px'},
    {title: 'Submissions', path: 'submissions', icon: 'icon-graphic-eq', 'icon-size': '20px'},
    {title: 'History', path: 'history', icon: 'icon-history', 'icon-size': '18px'},
    {title: 'Reports', path: 'reports', icon: 'icon-insert-chart-outlined', 'icon-size': '18px'},
    {title: 'Workflow', path: 'workflow', icon: 'icon-insert-chart-outlined', 'icon-size': '18px'},
  ];
  public currentPath = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.currentPath = this.router.url.split('/')[1];
    });
  }

}
