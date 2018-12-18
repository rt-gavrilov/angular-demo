import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';

export class FractalPainterWorker {

  private static worker = new Worker('fractal-worker.js');

  public static async paint(fractal: FractalSet, area: Rectangle, width: number, height: number): Promise<ImageData> {

    const messageId = Math.random();

    FractalPainterWorker.worker.postMessage({
      id: messageId,
      type: 'paint',
      params: {
        fractal: fractal.name,
        area,
        imageWidth: width,
        imageHeight: height
      }
    });

    let outsideResolve;
    const result = new Promise<ImageData>(success => {
      outsideResolve = success;
    });

    const listener = message => {

      const {id, imageData} = message.data;

      if (id == messageId) {
        FractalPainterWorker.worker.removeEventListener('message', listener);
        outsideResolve(imageData);
      }
    };

    FractalPainterWorker.worker.addEventListener('message', listener);

    return result;
  }

  private calcColor(iterations: number): number {
    return 0;
  }
}
