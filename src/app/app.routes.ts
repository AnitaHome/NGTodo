import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Privacy } from './privacy/privacy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'privacy', component: Privacy },
];
