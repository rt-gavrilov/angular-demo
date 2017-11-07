import {Rectangle} from "../../utils/rectangle";

export abstract class FractalSet {

  abstract readonly name: string;
  abstract readonly initialArea: Rectangle;

  abstract getPoint(x: number, y: number, max: number): number;
}
