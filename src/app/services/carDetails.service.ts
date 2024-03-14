import { Injectable,signal } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { CarConfig, CarModel } from "../models/car.model";

@Injectable({
    providedIn : "root"
})

export class CarService {
    carModelsList = signal<CarModel>({
        colors : []
    });
    carConfigurationList = signal<CarConfig>({});
    selectedModel : string = "";
    selectedColor : string = "";
    selectedConfig : number = 0;
    isTowHitch : boolean = false;
    isYokeSteeringWheel : boolean = false;
    selectedCarImagePath : string = "";
    private  enableSecondStep = signal<boolean>(false);
    stepTwoObserv$ = toObservable(this.enableSecondStep);
    private enableThirdStep = signal<boolean>(false);
    stepThreeObserv$ = toObservable(this.enableThirdStep);
    constructor(){}
    getCarModelList() : CarModel{
        return this.carModelsList();
    }
    updateCarModelsList(newValue :CarModel){
        this.carModelsList.set(newValue);
    }
    getCarConfigList() : CarConfig{
        return this.carConfigurationList();
    }
    updateCarConfigurationList(newVal :CarConfig){
        this.carConfigurationList.set(newVal);
    }
    updateStepTwoSignal(newValue : boolean){
        this.enableSecondStep.set(newValue);
    }
    updateStepThreeSignal(newValue : boolean){
        this.enableThirdStep.set(newValue);
    }
    getSelectedModel() : string{
       return this.selectedModel;
    }
    setModel(newModel : string){
        this.selectedModel = newModel;
    }
    getSelectedColor() : string{
      return this.selectedColor;
    }
    setColor(newColor : string){
        this.selectedColor = newColor;
    }
    getSelectedConfiguration() : number{
        return this.selectedConfig;
    }
    setConfiguration(newConfig : number){
        this.selectedConfig = newConfig;
    }
    getIsToHitch() : boolean{
        return this.isTowHitch;
    }
    setIsToHitch(newIsToHitch : boolean) {
        this.isTowHitch = newIsToHitch;
    }
    getIsYokeSteeringWheel() : boolean{
        return this.isYokeSteeringWheel;
    }
    setIsYokeSteeringWheel(newYokeSteeringWheel : boolean){
        this.isYokeSteeringWheel = newYokeSteeringWheel;
    }
    getSelectedCarImage() : string {
        return this.selectedCarImagePath;
    }
    setCarImagePath(path : string){
        this.selectedCarImagePath = path;
    }

}