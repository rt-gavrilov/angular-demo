import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeDetectionComponent} from './change-detection.component';
import {RouterModule, Routes} from '@angular/router';
import {TreeItemOnPushComponent, TreeItemDefaultComponent, TreeItemComponent} from './tree-item/tree-item.component';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes: Routes = [
  {path: '', component: ChangeDetectionComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [
    ChangeDetectionComponent,
    TreeItemComponent,
    TreeItemOnPushComponent,
    TreeItemDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FlexLayoutModule
  ]
})
export class ChangeDetectionModule { }
