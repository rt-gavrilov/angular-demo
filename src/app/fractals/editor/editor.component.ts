import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FRACTALS_AVAILABLE} from '../algorithms/fractals-available';
import {FractalSet} from '../algorithms/fractal-set';
import {Rectangle} from '../../utils/rectangle';

@Component({
  selector: 'rt-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  public fractal: FractalSet;
  public area: Rectangle;

  constructor(
    private route: ActivatedRoute
  ) {
    const id = route.snapshot.params['id'];

    this.fractal = FRACTALS_AVAILABLE.filter( value => value.name === id )[0];

    this.area = this.fractal.initialArea;
  }

  public onAreaSelect(value: Rectangle) {
    this.area = new Rectangle(
      this.area.left + this.area.width * value.left,
      this.area.top + this.area.height * value.top,
      this.area.left + this.area.width * value.right,
      this.area.top + this.area.height * value.bottom
    );
  }

  public zoomIn() {
    this.area = this.area.zoom(1.5);
  }

  public zoomOut() {
    this.area = this.area.zoom(1 / 1.5);
  }

  public resetZoom() {
    this.area = this.fractal.initialArea;
  }
}
