import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarService } from './services/carDetails.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent],
  providers: [CarService],
  templateUrl: './app.component.html'
})
export class AppComponent {
  
}
