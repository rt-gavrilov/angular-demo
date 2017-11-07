import {Component, Input, OnChanges, ViewChild} from "@angular/core";
import {FractalPainter} from "../algorithms/fractal-painter";
import {FractalSet} from "../algorithms/fractal-set";
import {Rectangle} from "../../utils/rectangle";

@Component({
  selector: 'rt-fractal',
  templateUrl: './fractal.component.html',
  styleUrls: ['./fractal.component.css']
})
export class FractalComponent implements OnChanges {

  @ViewChild('canvas') canvas;

  @Input() painter: FractalSet;
  @Input() area: Rectangle;

  private bounds: Rectangle;

  private redraw() {

    if ( ! this.painter || ! this.bounds) {
      return;
    }

    const imageData = new FractalPainter(this.painter)
      .paint(
        this.area || this.painter.initialArea,
        this.bounds.width, this.bounds.height
      );

    this.canvas.nativeElement.width = this.bounds.width;
    this.canvas.nativeElement.height = this.bounds.height;

    this.canvas
      .nativeElement
      .getContext("2d")
      .putImageData(imageData, 0, 0);
  }

  public onResize(bounds: Rectangle) {
    this.bounds = bounds;
    this.redraw();
  }

  public ngOnChanges() {
    this.redraw();
  }
}
