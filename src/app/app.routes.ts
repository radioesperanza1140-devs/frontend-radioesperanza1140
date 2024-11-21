import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutUsComponent } from './features/about-us/pages/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
];
