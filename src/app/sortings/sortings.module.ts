import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortingsComponent} from './sortings.component';
import {RouterModule, Routes} from '@angular/router';
import {LineChartModule} from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {path: '', component: SortingsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    LineChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SortingsComponent
  ]
})
export class SortingsModule { }
