import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroTestComponent } from './intro-test.component';

const routes: Routes = [
  {path: '', component: IntroTestComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroTestRoutingModule { }
