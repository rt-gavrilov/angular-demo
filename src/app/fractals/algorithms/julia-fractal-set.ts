import {FractalSet} from './fractal-set';
import {Rectangle} from '../../utils/rectangle';

export class JuliaFractalSet extends FractalSet {

  public readonly name = 'Julia';

  public readonly initialArea = new Rectangle(-2, -2, 2, 2);

  public getPoint(x: number, y: number): number {

    let IterCounter = 1;
    let ReComplex0 = x;
    let ImComplex0 = y;
    let ReComplex1;
    let ImComplex1;

    while (ReComplex0 * ReComplex0 + ImComplex0 * ImComplex0 <= 4.0 && IterCounter < 100) {
      IterCounter++;
      ReComplex1 = ReComplex0 * ReComplex0 - ImComplex0 * ImComplex0 + 1; //x0;
      ImComplex1 = 2.0 * ReComplex0 * ImComplex0 + 1;//y0;
      ReComplex0 = ReComplex1;
      ImComplex0 = ImComplex1;
    }

    return IterCounter;
  }
}
