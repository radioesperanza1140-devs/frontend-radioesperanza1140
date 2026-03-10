import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutUsComponent } from './features/about-us/pages/about-us/about-us.component';
import { ContactComponent } from './features/contact/pages/contact/contact.component';
import { ProgramationComponent } from './features/home/components/programation/programation.component';
import { ProgramationListComponent } from './features/programations/pages/programation-list/programation-list.component';
import { DonationSectionComponent } from './features/donation/components/donation-section.component';
import { DonationThanksComponent } from './features/donation-thanks/donation-thanks.component';
import { ProgramationDetailComponent } from './features/programations/pages/programation-detail/programation-detail.component';
ProgramationDetailComponent;

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'programations', component: ProgramationComponent },
  { path: 'programations-list', component: ProgramationListComponent },
  { path: 'donacion', component: DonationSectionComponent },
  { path: 'donacion/gracias', component: DonationThanksComponent },
  { path: 'detail-programation/:id', component: ProgramationDetailComponent },

  { path: '**', redirectTo: 'home' },
];
