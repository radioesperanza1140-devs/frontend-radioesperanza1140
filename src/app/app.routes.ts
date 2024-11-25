import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutUsComponent } from './features/about-us/pages/about-us/about-us.component';
import { ProgramationComponent } from './features/programation/pages/programation/programation.component';
import { ContactComponent } from './features/contact/pages/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'programations', component: ProgramationComponent },
  { path: '**', redirectTo: 'home' }  
  ];
