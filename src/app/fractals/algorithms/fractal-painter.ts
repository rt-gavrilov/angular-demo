import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';

export class FractalPainter {

  constructor(
    private strategy: FractalSet
  ) {}

  public paint(area: Rectangle, width: number, height: number): ImageData {

    const result = new ImageData(width, height);

    let position = 0;

    const dx = area.width / width;
    const dy = area.height / height;

    let min = 255;
    let max = 0;

    for (let j = 0, y = area.top; j < height; j++, y += dy) {
      for (let i = 0, x = area.left; i < width; i++, x += dx) {

        const pointValue = this.strategy.getPoint(x, y, 255);

        if (pointValue > max) {
          max = pointValue;
        }

        if (pointValue < min) {
          min = pointValue;
        }

        result.data[position++] = pointValue % 256;
        result.data[position++] = pointValue % 128;
        result.data[position++] = pointValue % 64;
        result.data[position++] = 255;
      }
    }

    return result;
  }
}
