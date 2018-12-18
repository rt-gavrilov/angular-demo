import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';

export abstract class FractalPainter {

  public static paint(fractal: FractalSet, area: Rectangle, width: number, height: number): ImageData {

    const result = new ImageData(width, height);

    let position = 0;

    const dx = area.width / width;
    const dy = area.height / height;

    const iterations = 128;

    for (let j = 0, y = area.top; j < height; j++, y += dy) {
      for (let i = 0, x = area.left; i < width; i++, x += dx) {

        const pointValue: number = fractal.getPoint(x, y, iterations);

        result.data[position++] = 8 * pointValue;
        result.data[position++] = 4 * pointValue;
        result.data[position++] = 2 * pointValue;
        result.data[position++] = 255;
      }
    }

    return result;
  }

  private calcColor(iterations: number): number {
    return 0;
  }
}
