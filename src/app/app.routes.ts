import { Routes } from '@angular/router';
import { CarModelColorComponent } from './dashboard/carModelColorComponent/car-model-color.component';
import { CarConfigComponent } from './dashboard/carConfigComponent/car-config.component';
import { CarSummaryComponent } from './dashboard/carSummaryComponent/car-summary.component';
import { NoRouteFoundComponent } from './dashboard/noRouteFoundComponent/no-route-found.component';
export const routes: Routes = [
    {path: "", redirectTo: "step1", pathMatch: "full" },
    {path:"step1", component : CarModelColorComponent},
    {path:"step2", component : CarConfigComponent},
    {path:"step3", component : CarSummaryComponent},
    {path: '**',  component : NoRouteFoundComponent}
];
