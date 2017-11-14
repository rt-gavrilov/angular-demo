import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IntroTestGuard} from './intro-test/intro-test.guard';
import {MatButtonModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RootComponent} from "./root.component";

const routes: Routes = [
  {path: '', canActivate: [IntroTestGuard], component: AppComponent, children: [
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: 'sortings', loadChildren: './sortings/sortings.module#SortingsModule'},
    {path: 'fractals', loadChildren: './fractals/fractals.module#FractalsModule'},
    {path: '', redirectTo: 'about', pathMatch: 'full'}
  ]},
  {path: 'test', loadChildren: './intro-test/intro-test.module#IntroTestModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule
  ],
  providers: [IntroTestGuard],
  bootstrap: [RootComponent]
})
export class AppModule { }
