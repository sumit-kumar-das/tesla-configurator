export interface CarModel{
    code? : string,
    description?: string,
    colors: Color[]    
}
export interface Color {
        code? : string,
        description?: string,
        price: number
}
export interface CarConfig  {
    configs: Config[],
    towHitch? : boolean, 
    yoke?: boolean
}
export interface Config {
    id?: number,
    description?: string,
    range? : number,
    speed? : number,
    price: number
}
export interface OtherOptions {
    towHitch?: boolean,
    yoke?: boolean
}
export interface SummaryDetails {
    modelDescription? : string,
    configDescription? : string,
    colorDescription? : string,
    selectedColorPrice : number,
    towHitchPackagePrice: number,
    isTowHitch : boolean,
    isYokeSteeringWheel : boolean,
    yokeSteeringWheelPrice : number,
    range?: number,
    speed?: number,
    price: number
}