import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CarConfig, CarModel, Color, Config } from '../../models/car.model';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { towHitchPackagePrice, yokoWheelSteeringPrice } from '../../constants/app.constant';
import { CarService } from '../../services/carDetails.service';

@Component({
  selector: 'car-summary',
  standalone: true,
  imports: [CurrencyPipe, MatTableModule, MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './car-summary.component.html',
  styleUrl: './car-summary.component.scss'
})
export class CarSummaryComponent {
  selectedModelDetails: any;
  selectedCarConfigDetails: any;
  selectedColorDetails: any;
  isTowHitch: any = false;
  isYokeSteeringWheel: boolean = false;
  towHitchPackagePrice = 0;
  yokeSteeringWheelPrice = 0;
  totalPrice = 0;
  selecedCarImgPath: string = "";
  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private carService: CarService) {
    const queryParams = this.route.snapshot.queryParamMap;
    const model: any = queryParams.get('model');
    const color: any = queryParams.get('color');
    const config: any = Number(queryParams.get('config'));
    const isTowHitch = queryParams.get('isTowHitch') === "true" ? true : false;
    const isYokeSteeringWheel = queryParams.get('yokeSteerWheel') === "true" ? true : false;
    this.isTowHitch = isTowHitch;
    this.isYokeSteeringWheel = isYokeSteeringWheel;
    if (isTowHitch) {
      this.towHitchPackagePrice = towHitchPackagePrice;
    }
    if (isYokeSteeringWheel) {
      this.yokeSteeringWheelPrice = yokoWheelSteeringPrice;
    }
    this.getModelDetails(model, color);
    this.getConfigurationDetails(model, config);
    this.selecedCarImgPath = this.carService.getSelectedCarImage();
  }
  getTotalCost(basePrice: number, colorPrice: number, isTowHitch: boolean, isYokeSteeringWheel: boolean) {
    this.totalPrice = basePrice + colorPrice;
    if (isTowHitch) {
      this.totalPrice = this.totalPrice + this.towHitchPackagePrice;
    }
    if (isYokeSteeringWheel) {
      this.totalPrice = this.totalPrice + this.yokeSteeringWheelPrice;
    }
  }
  getModelDetails(model: string, color: string) {
    this.httpClient.get('/models').subscribe((res: CarModel | any) => {
      this.selectedModelDetails = res.find((item: CarModel) => {
        return item.code === model;
      });
      this.selectedColorDetails = this.selectedModelDetails.colors.find((item: Color) => {
        return item.code === color
      });
    });
  }
  getConfigurationDetails(model: string, config: number) {
    this.httpClient.get('/options/' + model).subscribe((res: CarConfig | any) => {
      const selectedCarModelConfigs = res.configs;
      this.selectedCarConfigDetails = selectedCarModelConfigs.find((item: Config) => {
        return item.id === config;
      });
      setTimeout(() => {
        this.getTotalCost(this.selectedCarConfigDetails.price, this.selectedColorDetails.price, this.isTowHitch, this.isYokeSteeringWheel);
      }, 100);
    });
  }
}
