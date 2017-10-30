import {Component} from '@angular/core';
import {TdBounceAnimation, TdFadeInOutAnimation, TdHeadshakeAnimation, TdJelloAnimation} from '@covalent/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import {GrayOutAnimation} from "./gray-out.animation";
import * as lodash from 'lodash';

@Component({
  selector: 'rt-intro-test',
  templateUrl: './intro-test.component.html',
  styleUrls: ['./intro-test.component.css'],
  animations: [
    TdFadeInOutAnimation(),
    TdBounceAnimation(),
    TdHeadshakeAnimation(),
    TdJelloAnimation(),
    GrayOutAnimation()
  ]
})
export class IntroTestComponent {

  public readonly frameworks = lodash.shuffle(Framework.THEM_ALL);
  public chosen: Framework;

  constructor() {
    for (let i = 0; i < this.frameworks.length; i++) {
      setTimeout(() => this.frameworks[i].shown = true, i * 500);
    }
  }

  public onSelect(value: Framework) {
    this.chosen = value;
    this.chosen.select();
  }
}

class Framework {

  public static readonly THEM_ALL = [
    new Framework('react', 'Is it still good enough?'),
    new Framework('angular', 'Ok, fine!', true),
    new Framework('vue', 'You cannot be serious!'),
    new Framework('ember', 'What is this?'),
    new Framework('meteor', 'No way!'),
    new Framework('polymer', 'Oh, come on!'),
    new Framework('jquery', 'Wait, what???'),
    new Framework('backbone', 'It\'s nearly 2018! Forget about it!')
  ];

  public shown = false;
  public disabled = false;

  public jello = false;
  public headshake = false;
  public bounce = false;

  private debouncer = new Subject();

  private constructor(
    private id: string,
    public comment: string,
    public valid = false
  ) {
    this.debouncer.throttleTime(500).subscribe( () => {

      const random = Math.random();

      this.jello = random <= 1/3;
      this.headshake = random > 1/3 && random <= 2/3;
      this.bounce = random > 2/3;
    });
  }

  public get image(): string {
    return `assets/${this.id}.logo.png`;
  }

  public animate() {

    if (this.disabled) {
      return;
    }

    this.jello = false;
    this.headshake = false;
    this.bounce = false;

    setTimeout( () => this.debouncer.next(), 0);
  }

  public select() {
    if (! this.valid) {
      this.disabled = true;
    }
  }
}
