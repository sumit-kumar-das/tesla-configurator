import { Component, Input } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CarModelColorComponent } from './carModelColorComponent/car-model-color.component';
import { MatButtonModule } from '@angular/material/button';
import { CarService } from '../services/carDetails.service';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  enableSecondStep: boolean = false;
  enableThirdStep: boolean = false;
  selectedModel: string = "";
  selectedColor: string = "";
  selectedConfig: number = 0;
  selectedIsTowHitch: boolean = false;
  selectedIsYokeSteeringWheel: boolean = false;
  constructor(private router: Router, public carService: CarService) {
  }
  goToStep(step: number): void {
    this.selectedModel = this.carService.getSelectedModel();
    this.selectedColor = this.carService.getSelectedColor();
    this.selectedConfig = this.carService.getSelectedConfiguration();
    this.selectedIsTowHitch = this.carService.getIsToHitch();
    this.selectedIsYokeSteeringWheel = this.carService.getIsYokeSteeringWheel();
    let queryParams = {};
    switch (step) {
      case 2:
        queryParams = { model: this.selectedModel, color: this.selectedColor };
        break;
      case 3:
        queryParams = {
          model: this.selectedModel,
          color: this.selectedColor,
          config: this.selectedConfig,
          isTowHitch: this.selectedIsTowHitch,
          yokeSteerWheel: this.selectedIsYokeSteeringWheel
        };
        break;
      default:
        queryParams = {};
    }
    this.router.navigate(['step' + step], { queryParams: queryParams });
  }
  ngOnInit() {
    this.carService.stepTwoObserv$.subscribe((newState: any) => {
      this.enableSecondStep = newState;
    });
    this.carService.stepThreeObserv$.subscribe((newState: any) => {
      this.enableThirdStep = newState;
    });
  }

}
