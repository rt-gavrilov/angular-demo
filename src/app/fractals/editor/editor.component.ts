import {Component, HostBinding} from '@angular/core';
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

  public blocks: number[][] = [];

  public onResize(event) {
    const {width, height} = event;

    const blockSize = 100;

    const numBlocksHoriz = Math.ceil(width / blockSize);
    const numBlocksVert = Math.ceil(height / blockSize);

    console.log(numBlocksHoriz, numBlocksVert);

    for (let i = 0; i < numBlocksHoriz; i++) {
      for (let j = 0; j < numBlocksVert; j++) {
        // blocks[i][j]
      }
    }
  }

  constructor(
    private route: ActivatedRoute
  ) {
    const id = route.snapshot.params['id'];

    this.fractal = FRACTALS_AVAILABLE.filter( value => value.name === id )[0];

    this.area = this.fractal.initialArea;
  }

  public fractal: FractalSet;
  public area: Rectangle;

  onAreaSelect(value: Rectangle) {

    console.log('AREA CHANGE BEFORE', this.area);

    this.area = new Rectangle(
      value.left * this.area.width + this.area.left,
      value.top * this.area.height + this.area.top,
      value.right * this.area.width + this.area.left,
      value.bottom * this.area.height + this.area.top
    );

    console.log('AREA CHANGE AFTER', this.area);

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
