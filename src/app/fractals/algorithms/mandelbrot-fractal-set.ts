import {FractalSet} from "./fractal-set";
import {Rectangle} from "../../utils/rectangle";

export class MandelbrotFractalSet extends FractalSet {

  public readonly name = "Mandelbrot";

  public readonly initialArea = new Rectangle(-2, -2, 1, 2);

  getPoint1(x: number, y: number): number {

    let IterCounter = 1;
    let ReComplex0 = x;
    let ImComplex0 = y;
    let ReComplex1 = 0;
    let ImComplex1 = 0;

    while ( ReComplex0 * ReComplex0 + ImComplex0 * ImComplex0 <= 4 && IterCounter < 255) {
      IterCounter++;
      ReComplex1 = ReComplex0 * ReComplex0 - ImComplex0 * ImComplex0 + x;
      ImComplex1 = 2.0 * ReComplex0 * ImComplex0 + y;
      ReComplex0 = ReComplex1;
      ImComplex0 = ImComplex1;
    }

    return IterCounter;
  }

  getPoint3(x0: number, y0: number): number {

    let x = 0;
    let y = 0;
    let iteration = 0;

    let x2 = 0;
    let y2 = 0;

    while (x2 + y2 < 4  &&  iteration < 1000) {
      let xtemp = x2 - y2 + x0;
      let ytemp = 2*x*y + y0;
      // if (x == xtemp  && y == ytemp) {
      //   // console.log("1000");
      //   return 1000;
      // }
      x = xtemp;
      y = ytemp;
      iteration ++;

      x2 = x * x;
      y2 = y * y;
    }

    return iteration;
  }

  public getPoint(x0: number, y0: number, max: number = 255): number {

    let x = 0;
    let y = 0;
    let iteration = 0;

    let x2;
    let y2;

    do {

      x2 = x * x;
      y2 = y * y;

      let xtemp = x2 - y2 + x0;
      let ytemp = 2*x*y + y0;

      x = xtemp;
      y = ytemp;

      iteration ++;

    } while (x2 + y2 < 4 && iteration < max);

    return iteration;
  }
}
