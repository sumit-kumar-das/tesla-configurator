import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'no-route-found',
  standalone: true,
  imports: [MatButtonModule,RouterModule],
  templateUrl: './no-route-found.component.html',
  styleUrl: './no-route-found.component.scss'
})
export class NoRouteFoundComponent {
  title: string = "No Route Found";
  homeButtonText: string;
  constructor() {
    this.homeButtonText = "Show TESLA Cars"
  }
}
