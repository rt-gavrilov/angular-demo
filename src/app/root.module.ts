import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IntroTestGuard} from './intro-test/intro-test.guard';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RootComponent} from './root.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

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
    OverlayModule,
    RouterModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [IntroTestGuard],
  bootstrap: [RootComponent]
})
export class AppModule { }
