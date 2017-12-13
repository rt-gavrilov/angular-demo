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
}
