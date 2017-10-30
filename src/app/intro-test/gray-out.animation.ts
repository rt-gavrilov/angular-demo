import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function GrayOutAnimation(): AnimationTriggerMetadata {
  return trigger('rtGrayOut', [
    state('0', style({
      filter: 'grayscale(0)'
    })),
    state('1',  style({
      filter: 'grayscale(100%)'
    })),
    transition('0 => 1', animate('0ms 500ms ease-out')),
    transition('1 => 0', animate('0ms 500ms ease-in'))
  ]);
}
