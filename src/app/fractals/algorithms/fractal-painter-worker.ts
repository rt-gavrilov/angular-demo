import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';

export class FractalPainterWorker {

  private static lastWorker = 0;
  private static workers = [1,2,3,4].map(value => new Worker('fractal-worker.js'));

  public static async paint(fractal: FractalSet, area: Rectangle, width: number, height: number): Promise<ImageData> {

    const messageId = Math.random();

    FractalPainterWorker.lastWorker ++;
    const worker = FractalPainterWorker.workers[
      FractalPainterWorker.lastWorker % FractalPainterWorker.workers.length
    ];

    worker.postMessage({
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
        worker.removeEventListener('message', listener);
        outsideResolve(imageData);
      }
    };

    worker.addEventListener('message', listener);

    return result;
  }

  private calcColor(iterations: number): number {
    return 0;
  }
}
