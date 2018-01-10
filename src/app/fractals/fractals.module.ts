import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {FractalComponent} from './painter/fractal.component';
import {ShowroomComponent} from './showroom/showroom.component';
import {EditorComponent} from './editor/editor.component';
import {SelectableAreaComponent} from './editor/selectable-area/selectable-area.component';
import {MatCardModule} from '@angular/material/card';
import {UtilsModule} from '../utils/utils.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
  {path: '', component: ShowroomComponent},
  {path: ':id', component: EditorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    UtilsModule
  ],
  declarations: [
    FractalComponent,
    ShowroomComponent,
    EditorComponent,
    SelectableAreaComponent
  ]
})
export class FractalsModule {}
