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

  @ViewChild('canvas', {static: true}) canvas;

  @Input() fractalSet: FractalSet;
  @Input() area: Rectangle;
  @Input() palette: string[];
  @Input() keepWhRate = false;

  private bounds: Rectangle;

  private async redraw() {

    if ( ! this.fractalSet || ! this.bounds) {
      return;
    }

    FractalPainterWorker.paint(
      this.canvas.nativeElement.getContext('2d'),
      this.fractalSet,
      this.transformArea(),
      this.bounds.width,
      this.bounds.height,
      this.palette
    );
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

    this.canvas.nativeElement.width = this.bounds.width;
    this.canvas.nativeElement.height = this.bounds.height;

    this.redraw();
  }

  public ngOnChanges() {
    this.area = this.area || this.fractalSet.initialArea;
    this.palette = this.palette || this.fractalSet.colorPalette;
    this.redraw();
  }
}
