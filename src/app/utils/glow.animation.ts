import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export function GlowAnimation(): AnimationTriggerMetadata {
  return trigger('glow', [
    transition('* => *', [
      animate('250ms {{delay}}ms ease', style({ 'box-shadow': '0px 0px 10px 10px rgba(0, 255, 0, 0.5)'})),
      animate('250ms 0ms ease', style({ 'box-shadow': '0px 0px 10px 10px rgba(0, 255, 0, 0)'})),
      // animate('0.25s 0ms ease-in', style({ 'box-shadow': 'none'}))
    ])
  ]);
}
