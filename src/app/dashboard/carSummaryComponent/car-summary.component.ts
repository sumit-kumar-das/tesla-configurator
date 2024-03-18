import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CarConfig, CarModel, Color, Config, SummaryDetails } from '../../models/car.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
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
  summaryDetails : SummaryDetails = {
    modelDescription : "",
    configDescription : "",
    colorDescription : "",
    selectedColorPrice : 0,
    towHitchPackagePrice: 0,
    isTowHitch : false,
    isYokeSteeringWheel : false,
    yokeSteeringWheelPrice : 0,
    range: 0,
    speed: 0,
    price: 0
  };
  totalPrice = 0;
  selecedCarImgPath: string = "";
  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private carService: CarService) {
    const queryParams = this.route.snapshot.queryParamMap;
    const model: string = String(queryParams.get('model'));
    const color: string = String(queryParams.get('color'));
    const config: number = Number(queryParams.get('config'));
    this.summaryDetails.isTowHitch = queryParams.get('isTowHitch') === "true" ? true : false;
    this.summaryDetails.isYokeSteeringWheel = queryParams.get('yokeSteerWheel') === "true" ? true : false;
    if (this.summaryDetails.isTowHitch) {
      this.summaryDetails.towHitchPackagePrice = towHitchPackagePrice;
    }
    if (this.summaryDetails.isYokeSteeringWheel) {
      this.summaryDetails.yokeSteeringWheelPrice = yokoWheelSteeringPrice;
    }
    this.getModelDetails(model, color);
    this.getConfigurationDetails(model, config);
    this.selecedCarImgPath = this.carService.getSelectedCarImage();
  }
  getTotalCost(carData : SummaryDetails) {
    this.totalPrice = carData.price + carData.selectedColorPrice;
    if (carData.isTowHitch) {
      this.totalPrice = this.totalPrice + this.summaryDetails.towHitchPackagePrice;
    }
    if (carData.isYokeSteeringWheel) {
      this.totalPrice = this.totalPrice + this.summaryDetails.yokeSteeringWheelPrice;
    }
  }
  getModelDetails(model: string, color: string) {
    this.httpClient.get<CarModel[]>('/models').subscribe((res: Array<CarModel> ) => {
      res.forEach((item :CarModel)=>{
        if(item.code === model){
          this.summaryDetails.modelDescription = item.description;
          item.colors.forEach((colorModel : Color) => {
            if(colorModel.code === color){
              this.summaryDetails.colorDescription = colorModel.description;
              this.summaryDetails.selectedColorPrice = colorModel.price;
              return;
            }
          })
        }
      });
    });
  }
  getConfigurationDetails(model: string, config: number) {
    this.httpClient.get<CarConfig>('/options/' + model).subscribe((res: CarConfig ) => {
      res.configs.forEach((item: Config) => {
        if(item.id === config){
          this.summaryDetails.price = item.price;
          this.summaryDetails.range = item.range;
          this.summaryDetails.speed = item.speed;
          return;
        };
      });
        this.getTotalCost(this.summaryDetails);
    });
  }
}
