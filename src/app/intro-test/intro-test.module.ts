import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroTestComponent} from './intro-test.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {CovalentMessageModule} from '@covalent/core/message';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: IntroTestComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule,
    CovalentMessageModule
  ],
  declarations: [
    IntroTestComponent
  ]
})
export class IntroTestModule { }
