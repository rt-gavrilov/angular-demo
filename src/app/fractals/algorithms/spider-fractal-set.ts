import {FractalSet} from "./fractal-set";
import {Rectangle} from "../../utils/rectangle";

export class SpiderFractalSet extends FractalSet {

  public readonly name = "Spider";

  public readonly initialArea = new Rectangle(-2, -2, 1, 2);

  public getPoint(x: number, y: number): number {

    let IterCounter = 1;
    let ReComplex0 = x;
    let ImComplex0 = y;
    let ReComplex1;
    let ImComplex1;
    let ReComplex2 = x;
    let ImComplex2 = y;

    while (ReComplex0 * ReComplex0 + ImComplex0 * ImComplex0 <= 4.0 && IterCounter < 100) {
      IterCounter++;
      ReComplex1 = ReComplex0 * ReComplex0 - ImComplex0 * ImComplex0 + ReComplex2;
      ImComplex1 = 2.0 * ReComplex0 * ImComplex0 + ImComplex2;
      ReComplex0 = ReComplex1;
      ImComplex0 = ImComplex1;
      ReComplex2 = 0.5 * ReComplex2 + ReComplex0;
      ImComplex2 = 0.5 * ImComplex2 + ImComplex0;
    }

    return IterCounter;
  }
}
