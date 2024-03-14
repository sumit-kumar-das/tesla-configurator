import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CarConfig, Config, OtherOptions } from '../../models/car.model';
import { CarService } from '../../services/carDetails.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'car-config',
  standalone: true,
  imports: [HttpClientModule, FormsModule, MatSelectModule, MatCardModule, MatButtonModule, MatCheckboxModule, CommonModule],
  templateUrl: './car-config.component.html',
  styleUrl: './car-config.component.scss'
})
export class CarConfigComponent {
  selectedConfiguration: number = 0;
  isTowHitch: boolean = false;
  isYokeSteeringWheel: boolean = false;
  carConfigList: Config[] = [];
  showCard: boolean = false;
  selectedConfigurationDetails: Config = {
    id: 0,
    description: "",
    range: 0,
    speed: 0,
    price: 0
  };
  selecedCarImgPath: string = "";
  otherOptions: OtherOptions = {};
  constructor(private httpClient: HttpClient, private carService: CarService, private route: ActivatedRoute) {
    const config = this.carService.getSelectedConfiguration();
    if (config && config !== 0) {
      this.ngOnInit();
      setTimeout(() => {
        this.onChangeOfConfiguration(config);
        console.log(this.carService.getIsToHitch());
        this.isTowHitch = this.carService.getIsToHitch();
        this.isYokeSteeringWheel = this.carService.getIsYokeSteeringWheel();
      }, 1000);
    }else{
      this.carService.setIsYokeSteeringWheel(false);
      this.carService.setIsToHitch(false);
    }
  }
  ngOnInit() {
    const queryParams = this.route.snapshot.queryParamMap;
    const model = queryParams.get('model');
    const color = queryParams.get('color');
    this.selecedCarImgPath = this.carService.getSelectedCarImage();
    this.httpClient.get('/options/' + model).subscribe((res: CarConfig | any) => {
      this.otherOptions = {
        towHitch: res.towHitch,
        yoke: res.yoke
      };
      this.carConfigList = res.configs;
    });
  }
  onChangeOfConfiguration(configId: number) {
    this.selectedConfiguration = 0;
    const filterByConfigId = this.carConfigList.find((item) => {
      return item.id === configId;
    });
    if (filterByConfigId) {
      this.selectedConfigurationDetails = filterByConfigId;
      this.showCard = true;
    } else {
      this.selectedConfigurationDetails = {};
      this.showCard = false;
    }
    this.selectedConfiguration = configId;
    this.carService.setConfiguration(this.selectedConfiguration);
    if (this.selectedConfiguration) {
      this.carService.updateStepThreeSignal(true);
    } else {
      this.carService.updateStepThreeSignal(false);
    }
  }
  onChangeOfYokeSteeringWheel() {
    this.carService.setIsYokeSteeringWheel(this.isYokeSteeringWheel);
  }
  onChangeOfTowHitch() {
    this.carService.setIsToHitch(this.isTowHitch);
  }
}
