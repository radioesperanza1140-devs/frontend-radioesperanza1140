import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutUsComponent } from './features/about-us/pages/about-us/about-us.component';
import { ContactComponent } from './features/contact/pages/contact/contact.component';
import { ProgramationComponent } from './features/home/components/programation/programation.component';
import { ProgramationListComponent } from './features/programations/pages/programation-list/programation-list.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'programations', component: ProgramationComponent },
  { path: 'programations-list', component: ProgramationListComponent },
  //{ path: '**', redirectTo: 'home' }
  ];
