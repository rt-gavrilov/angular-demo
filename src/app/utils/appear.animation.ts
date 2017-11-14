import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';

export function AppearAnimation(from: 'top' | 'bottom' | 'left' | 'right' = 'top'): AnimationTriggerMetadata {
  return trigger('appear', [
    transition('void => *', [
      style({
        transform:
          from === 'top' ? 'translateY(-100%)' :
          from === 'bottom' ? 'translateY(100%)' :
          from === 'left' ? 'translateX(-100%)' :
          from === 'right' ? 'translateX(100%)' : '',
        opacity: 0
      }),
      animate('0.5s {{delay}}ms ease-out')
    ])
  ]);
}
