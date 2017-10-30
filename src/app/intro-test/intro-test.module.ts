import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IntroTestRoutingModule} from './intro-test-routing.module';
import {IntroTestComponent} from './intro-test.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material';
import {CovalentMessageModule} from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    CovalentMessageModule,
    IntroTestRoutingModule
  ],
  declarations: [
    IntroTestComponent
  ]
})
export class IntroTestModule { }
