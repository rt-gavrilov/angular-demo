import {Rectangle} from '../../utils/rectangle';

export abstract class FractalSet {

  abstract readonly name: string;
  abstract readonly initialArea: Rectangle;

  readonly numIterations: number = 128;

  abstract getPoint(x: number, y: number, max: number): number;
}
