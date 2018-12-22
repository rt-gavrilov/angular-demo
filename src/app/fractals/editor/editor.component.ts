import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
  public palette: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const id = route.snapshot.params['id'];

    this.fractal = FRACTALS_AVAILABLE.filter( value => value.name === id )[0];

    this.route.queryParamMap.subscribe( (query: ParamMap) => {
      this.area = new Rectangle(
      parseFloat(query.get('left')) || this.fractal.initialArea.left,
      parseFloat(query.get('top')) || this.fractal.initialArea.top,
      parseFloat(query.get('right')) || this.fractal.initialArea.right,
      parseFloat(query.get('bottom')) || this.fractal.initialArea.bottom
      );

      let palette: any = query.get('palette');

      this.palette = palette ? palette.split(',') : this.fractal.colorPalette;
    });
  }

  public onAreaSelect(value: Rectangle) {
    this.updateUrl(
      new Rectangle(
        this.area.left + this.area.width * value.left,
        this.area.top + this.area.height * value.top,
        this.area.left + this.area.width * value.right,
        this.area.top + this.area.height * value.bottom
      )
    );
  }

  public zoomIn() {
    this.updateUrl(this.area.zoom(1.5));
  }

  public zoomOut() {
    this.updateUrl(this.area.zoom(1 / 1.5));
  }

  public resetZoom() {
    this.updateUrl(this.fractal.initialArea);
  }

  private updateUrl(area: Rectangle = null) {
    this.router.navigate([], {
      queryParams: {
        left: area.left,
        right: area.right,
        top: area.top,
        bottom: area.bottom,
        palette: this.palette.join(',')
      }
    })
  }
}
