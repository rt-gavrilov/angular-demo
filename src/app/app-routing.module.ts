import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroTestGuard} from './intro-test/intro-test.guard';

const routes: Routes = [
  {path: '', canActivate: [IntroTestGuard], children: []},
  {path: 'test', loadChildren: './intro-test/intro-test.module#IntroTestModule'},
  {path: 'sortings', loadChildren: './sortings/sortings.module#SortingsModule'},
  {path: 'fractals', loadChildren: './fractals/fractals.module#FractalsModule'},
  {path: '*', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
