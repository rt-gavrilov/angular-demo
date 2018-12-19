import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {sleep} from './async-utils';
import {distinctUntilChanged} from 'rxjs/internal/operators';

export type ResizeDimensions = {width: number, height: number};

@Directive({
  selector: '[rtResizeDetector]'
})
export class ResizeDetectorDirective implements OnInit {

  private debouncer = new Subject<ResizeDimensions>();

  constructor(
    private host: ElementRef
  ) {
    this.debouncer
      .pipe(
        distinctUntilChanged((prev, next) => {
          return prev.height == next.height && prev.width == next.width;
        }),
        debounceTime(500)
      )
      .subscribe(bounds => {
        this.resize.emit(bounds);
      });
  }

  @Output()
  public resize = new EventEmitter<ResizeDimensions>();

  @HostListener('window:resize')
  public async onResize() {

    await sleep();

    this.debouncer.next(this.bounds);
  }

  private get bounds(): ResizeDimensions {
    return this.host.nativeElement.getBoundingClientRect() as ResizeDimensions;
  }

  public ngOnInit() {
    // emit the first value immediately
    this.resize.emit(this.bounds);
  }
}
