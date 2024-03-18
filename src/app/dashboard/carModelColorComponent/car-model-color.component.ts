import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CarModel, Color } from '../../models/car.model'
import { carImageBasePath } from '../../constants/app.constant';
import { CarService } from '../../services/carDetails.service';
@Component({
  selector: 'car-model-color',
  standalone: true,
  imports: [AsyncPipe, HttpClientModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './car-model-color.component.html',
  styleUrl: './car-model-color.component.scss'
})
export class CarModelColorComponent {
  name: string = 'Car Model Color Selection Component';
  carModelList: CarModel[] = [];
  carColorList: Color[] = [];
  selectedModel: string = "";
  selectedColor: string = "";
  selecedCarImgPath: string = "";
  constructor(private httpClient: HttpClient, private carService: CarService) {
    this.httpClient.get<CarModel[]>('/models').subscribe((res : Array<CarModel> ) => {
      this.carModelList = res;
      this.carService.updateCarModelsList(res);
    });
  }
  ngOnInit() {
    const model = this.carService.getSelectedModel();
    const color = this.carService.getSelectedColor();
    if (model) {
      this.selectedModel = model;
      this.carModelList = this.carService.getCarModelList();
      this.onChangeOfModel(model, false);
      if (color) {
        this.selectedColor = color;
        this.onChangeOfColor(color);
      }
    }
  }
  onChangeOfModel(model: string, isManuallyChanged: boolean) {
    this.selectedColor = "";
    this.selecedCarImgPath = "";
    const filterByModel = this.carModelList.find((item: CarModel) => {
      return item.code === model;
    });
    if (filterByModel) {
      this.carColorList = filterByModel.colors;
    } else {
      this.carColorList = [];
    }
    this.notifyOtherSteps(this.selectedModel, this.selectedColor);
    if (isManuallyChanged) {
      // reset other tabs
      this.carService.updateStepTwoSignal(false);
      this.carService.updateStepThreeSignal(false);
      this.carService.setConfiguration(0);
    }
  }
  onChangeOfColor(color: string) {
    this.selecedCarImgPath = carImageBasePath + this.selectedModel + '/' + this.selectedColor + '.jpg';
    this.notifyOtherSteps(this.selectedModel, this.selectedColor);
  }
  notifyOtherSteps(selectedModel: string, selectedColor: string) {
    this.carService.setModel(this.selectedModel);
    this.carService.setColor(this.selectedColor);
    this.carService.setCarImagePath(this.selecedCarImgPath);
    if (selectedModel && selectedColor) {
      this.carService.updateStepTwoSignal(true);
      const config = this.carService.getSelectedConfiguration();
      if (config) {
        this.carService.updateStepThreeSignal(true);
      }
    } else {
      this.carService.updateStepTwoSignal(false);
      this.carService.updateStepThreeSignal(false);
    }
  }

}
