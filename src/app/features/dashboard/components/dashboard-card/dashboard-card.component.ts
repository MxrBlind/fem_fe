import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input() cardElement: any;
}
