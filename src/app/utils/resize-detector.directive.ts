import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {sleep} from './async-utils';
import {Rectangle} from './rectangle';

@Directive({
  selector: '[resizeDetector]'
})
export class ResizeDetectorDirective implements OnInit {

  private prevValue = new Rectangle();

  constructor(
    private host: ElementRef
  ) {}

  @Output()
  public resize = new EventEmitter<{ width: number, height: number }>();

  @HostListener('window:resize')
  public async onResize() {

    const bounds = this.host.nativeElement.getBoundingClientRect();

    const newRect = new Rectangle(0, 0, bounds.width, bounds.height);

    if ( newRect.equals(this.prevValue)) {
      return;
    }

    this.prevValue = newRect;

    await sleep();

    this.resize.emit({
      width: bounds.width,
      height: bounds.height
    });
  }

  public ngOnInit() {
    this.onResize();
  }
}
