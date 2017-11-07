import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';

export function AppearAnimation(): AnimationTriggerMetadata {
  return trigger('appear', [
    transition('void => *', [
      style({transform: 'translateY(-100%)', opacity: 0}),
      animate('0.5s ease-out')
    ])
  ])
}
