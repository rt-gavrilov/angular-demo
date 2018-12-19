import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {FractalPainter} from '../algorithms/fractal-painter';
import {FractalSet} from '../algorithms/fractal-set';
import {Rectangle} from '../../utils/rectangle';
import {FractalPainterWorker} from '../algorithms/fractal-painter-worker';

@Component({
  selector: 'rt-fractal',
  templateUrl: './fractal.component.html',
  styleUrls: ['./fractal.component.css']
})
export class FractalComponent implements OnChanges {

  @ViewChild('canvas') canvas;

  @Input() fractalSet: FractalSet;
  @Input() area: Rectangle;
  @Input() keepWhRate = false;

  private bounds: Rectangle;

  private async redraw() {

    if ( ! this.fractalSet || ! this.bounds) {
      return;
    }

    const area = this.transformArea();

    const now = new Date().getTime();

    const context = this.canvas.nativeElement.getContext('2d');

    FractalPainterWorker.paint(
      this.fractalSet, area.leftTopQuadrant, Math.floor(this.bounds.width / 2), Math.floor(this.bounds.height / 2)
    ).then(imageData => {
      context.putImageData(imageData, 0, 0);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paint(
      this.fractalSet, area.rightTopQuadrant, Math.ceil(this.bounds.width / 2), Math.floor(this.bounds.height / 2)
    ).then(imageData => {
      context.putImageData(imageData, this.bounds.width / 2, 0);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paint(
      this.fractalSet, area.leftBottomQuadrant, Math.floor(this.bounds.width / 2), Math.ceil(this.bounds.height / 2)
    ).then(imageData => {
      context.putImageData(imageData, 0, this.bounds.height / 2);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paint(
      this.fractalSet, area.rightBottomQuadrant, Math.ceil(this.bounds.width / 2), Math.ceil(this.bounds.height / 2)
    ).then(imageData => {
      context.putImageData(imageData, this.bounds.width / 2, this.bounds.height / 2);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    // const imageData = FractalPainter.paint(this.fractalSet, area, this.bounds.width, this.bounds.height);
    // const imageData = await FractalPainterWorker.paint(this.fractalSet, area, this.bounds.width, this.bounds.height);

    this.canvas.nativeElement.width = this.bounds.width;
    this.canvas.nativeElement.height = this.bounds.height;
  }

  private transformArea(): Rectangle {

    if (!this.keepWhRate) {
      return this.area;
    }

    const area = this.area.clone();

    const boundsProp = this.bounds.width / this.bounds.height;
    const areaProp = area.width / area.height;

    if (boundsProp > areaProp) {
      const areaHeight = area.height;
      const newAreaHeight = area.height * areaProp / boundsProp;

      area.top += (newAreaHeight - areaHeight) / - 2;
      area.bottom -= (newAreaHeight - areaHeight) / - 2;
    } else {
      const areaWidth = this.area.width;
      const newAreaWidth = this.area.width * boundsProp / areaProp;

      area.left += (newAreaWidth - areaWidth) / 2;
      area.right -= (newAreaWidth - areaWidth) / 2;
    }

    return area;
  }

  public onResize(bounds: Rectangle) {
    this.bounds = bounds;
    this.redraw();
  }

  public ngOnChanges() {
    this.area = this.area || this.fractalSet.initialArea;
    this.redraw();
  }
}
