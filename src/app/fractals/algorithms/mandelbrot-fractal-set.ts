import {FractalSet} from './fractal-set';
import {Rectangle} from '../../utils/rectangle';

export class MandelbrotFractalSet extends FractalSet {

  public readonly name = 'Mandelbrot';

  public readonly initialArea = new Rectangle(-2.25, -2, 0.75, 2);

  public getPoint(x0: number, y0: number, max: number = 255): number {

    let x = 0;
    let y = 0;
    let iteration = 0;

    let x2;
    let y2;

    do {

      x2 = x * x;
      y2 = y * y;

      const xtemp = x2 - y2 + x0;
      const ytemp = 2 * x * y + y0;

      x = xtemp;
      y = ytemp;

      iteration ++;

    } while (x2 + y2 < 4 && iteration < max);

    return iteration;
  }
}
