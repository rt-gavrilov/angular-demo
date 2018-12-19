import {Component} from '@angular/core';
import {AppearAnimation} from '../utils/appear.animation';

@Component({
  selector: 'rt-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    AppearAnimation('top')
  ]
})
export class AboutComponent {
  assets = [
    "assets/angular.logo.png",
    "assets/material-design.logo.svg",
    "assets/covalent.logo.svg",
    "assets/swimlane.logo.png",
    "assets/rxjs.logo.png",
    "assets/typescript.logo.png",
    "assets/sass.logo.png",
    "assets/webpack.logo.svg",
    "assets/npm.logo.png"
  ];
}
