import {Component} from '@angular/core';

@Component({
  selector: 'rt-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss']
})
export class ChangeDetectionComponent {
  trigger() {
    console.log('TRIGGER');
  }
}
