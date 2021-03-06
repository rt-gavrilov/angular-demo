import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {path: '', component: AboutComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
