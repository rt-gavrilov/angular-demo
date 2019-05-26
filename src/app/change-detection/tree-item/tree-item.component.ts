import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, NgZone} from '@angular/core';
import {GlowAnimation} from '../../utils/glow.animation';
import {sleep} from '../../utils/async-utils';


@Component({
  template: ''
})
export class TreeItemComponent implements DoCheck {

  static cdCounter = 0;


  @Input() depth: number = 0;
  @Input() maxDepth: number;

  totalChecks = 0;
  counter1 = 0;


  onPush = false;

  glow = false;

  constructor(
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef
  ) {
    // changeDetector.
  }

  ngDoCheck() {

    this.totalChecks ++;
    if (this.depth == 0) {
      TreeItemComponent.cdCounter = 0;
    } else {
      TreeItemComponent.cdCounter ++;
    }

    this.counter1 = TreeItemComponent.cdCounter;

    this.glow = ! this.glow;
  }

  get leaf(): boolean {
    return this.depth >= this.maxDepth;
  }

  trigger() {
    // this.changeDetector.detectChanges();
  }
}


@Component({
  selector: 'rt-tree-item-default',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  animations: [
    GlowAnimation()
  ]
})
export class TreeItemDefaultComponent extends TreeItemComponent {}


@Component({
  selector: 'rt-tree-item-on-push',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    GlowAnimation()
  ]
})
export class TreeItemOnPushComponent extends TreeItemComponent {
  onPush = true;
}
