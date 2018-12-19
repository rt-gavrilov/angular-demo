import {Component} from '@angular/core';
import {tdBounceAnimation, tdFadeInOutAnimation, tdHeadshakeAnimation, tdJelloAnimation} from '@covalent/core/common';
import {Subject} from 'rxjs';
import {GrayOutAnimation} from '../utils/gray-out.animation';
import {pull, shuffle} from 'lodash';
import {IntroTestGuard} from './intro-test.guard';
import {Router} from '@angular/router';
import {throttleTime} from 'rxjs/operators';

@Component({
  selector: 'rt-intro-test',
  templateUrl: './intro-test.component.html',
  styleUrls: ['./intro-test.component.css'],
  animations: [
    tdFadeInOutAnimation,
    tdBounceAnimation,
    tdHeadshakeAnimation,
    tdJelloAnimation,
    GrayOutAnimation()
  ]
})
export class IntroTestComponent {

  public readonly frameworks = shuffle(Framework.THEM_ALL);
  public chosen: Framework;

  constructor(
    private router: Router
  ) {
    for (let i = 0; i < this.frameworks.length; i++) {
      setTimeout(() => this.frameworks[i].shown = true, i * 500);
    }
  }

  public onSelect(value: Framework) {
    this.chosen = value;
    this.chosen.select();

    if ( ! this.chosen.valid) {
      return;
    }

    for (let framework of this.frameworks) {
      if (! framework.valid) {
        framework.disabled = true;
        framework.shown = false;
      }
    }

    localStorage.setItem(IntroTestGuard.localStorageKey, 'true');

    setTimeout(() => this.router.navigate(['/']), 1000);
  }
}

class Framework {

  public static readonly THEM_ALL = [
    new Framework('react', 'Mmmm... maybe next time.'),
    new Framework('angular', 'Ok, fine!', true),
    new Framework('vue', 'You cannot be serious!'),
    new Framework('ember', 'What is this?'),
    new Framework('meteor', 'No way!'),
    new Framework('polymer', 'Oh, come on!'),
    new Framework('jquery', 'Wait, what???'),
    new Framework('backbone', 'It\'s nearly 2019! Forget about it!')
  ];

  public shown = false;
  public disabled = false;
  public jello = false;
  public headshake = false;
  public bounce = false;

  private prevAnimation: string = null;

  private debouncer = new Subject();

  private constructor(
    private id: string,
    public comment: string,
    public valid = false
  ) {
    this.debouncer.pipe(throttleTime(500)).subscribe( () => {

      if (this.disabled) {
        return;
      }

      const availableAnimations = pull([
        'jello',
        'headshake',
        'bounce'
      ], this.prevAnimation);

      const animation = shuffle(availableAnimations)[0];

      if (animation == 'jello') {
        this.jello = ! this.jello;
      } else if (animation == 'headshake') {
        this.headshake = ! this.headshake;
      } else {
        this.bounce = ! this.bounce;
      }

      this.prevAnimation = animation;
    });
  }

  public get image(): string {
    return `assets/${this.id}.logo.png`;
  }

  public async animate() {
    this.debouncer.next();
  }

  public select(): boolean {
    if (! this.valid) {
      this.disabled = true;
    }

    return this.valid;
  }
}
