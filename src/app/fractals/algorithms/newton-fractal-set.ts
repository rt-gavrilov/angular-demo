import {FractalSet} from './fractal-set';
import {Rectangle} from '../../utils/rectangle';

export class NewtonFractalSet extends FractalSet {

  public readonly name = 'Newton';

  public readonly initialArea = new Rectangle(-1, -1, 1, 1);

  getPoint(x: number, y: number): number {

    let ReComplex0 = x;
    let ImComplex0 = y;

    for (let i = 0; i < 256; i++) {

        let Re2 = ReComplex0 * ReComplex0;
        let Im2 = ImComplex0 * ImComplex0;
        let ReIm2 = (Re2 + Im2) * (Re2 + Im2);

        let ReComplex1 = 0.6666666666666667 * ReComplex0 + ( Re2 - Im2 ) / ( 3.0 * ReIm2 );
        let ImComplex1 = 0.6666666666666667 * ImComplex0 * ( 1 - ReComplex0 / ReIm2 );

        let dReComplex = ReComplex1 - ReComplex0;
        let dImComplex = ImComplex1 - ImComplex0;

        ReComplex0 = ReComplex1;
        ImComplex0 = ImComplex1;

        if (dReComplex * dReComplex + dImComplex * dImComplex < 0.0000000000000001) {
          return i;
        }
    }

    return 256;
  }
}
