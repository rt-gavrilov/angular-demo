import {Component} from '@angular/core';
import {FractalSet} from '../algorithms/fractal-set';
import {FRACTALS_AVAILABLE} from '../algorithms/fractals-available';
import {AppearAnimation} from '../../utils/appear.animation';
import {MandelbrotFractalSet} from '../algorithms/mandelbrot-fractal-set';
import {Rectangle} from '../../utils/rectangle';
import {NewtonFractalSet} from '../algorithms/newton-fractal-set';

@Component({
  selector: 'rt-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss'],
  animations: [
    AppearAnimation()
  ]
})
export class ShowroomComponent {
  public fractals: FractalSet[] = FRACTALS_AVAILABLE;

  public items = [{
    fractal: new MandelbrotFractalSet(),
    area: new MandelbrotFractalSet().initialArea,
    palette:  ['lightblue', 'blue', 'green', '000022']
  }, {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(-1.3640625, -0.08379681127178351, -1.3282552083333332, -0.03605375571622793),
    palette:  ['cyan', 'blue', 'green', '000022']
  }, {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(-1.395715560913086, 0.015380544354838648, -1.3942464752197266, 0.017339325279317815),
    palette:  ['cyan', 'green', 'yellow', '000022']
  }, {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(-0.5239871862758447, -0.6792189660010448, -0.5239438789850537, -0.6791612229466564),
    palette:  ['white', 'cyan', 'magenta', 'black']
  }, {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(0.0014955681654174927, -0.8227642833317416, 0.0015085293050599896, -0.822750667479224),
    palette:  ['white', 'blue' , 'cyan', 'black']
  }, {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(0.0016435960066554017, -0.8224677656262847, 0.0016438479356525983, -0.8224675009714653),
    palette:  ['white', 'orange', 'red', 'orange', 'black']
  },
  //   {
  //   fractal: new MandelbrotFractalSet(),
  //   area: new Rectangle(0.13983400258777193, 0.6460684939618557, 0.14134958611383566, 0.6480892719966075),
  //   palette:  ['white', 'orange','yellow', 'green']
  // },
    {
    fractal: new MandelbrotFractalSet(),
    area: new Rectangle(0.14064011428730092, 0.6454218712217931, 0.14078129221660626, 0.6456101084608669),
    palette:  ['white', 'yellow', 'yellow', 'green', 'darkgreen']
  }, {
    fractal: new NewtonFractalSet(),
    area: new NewtonFractalSet().initialArea,
    palette:  ['lightblue', 'blue', 'green', '000022']
  }];

  public getQueryParams(item) {
    return {
      left: item.area.left,
      right: item.area.right,
      top: item.area.top,
      bottom: item.area.bottom,
      palette: item.palette.join(',')
    };
  }
}
