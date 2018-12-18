import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';
import {sleep} from '../../utils/async-utils';

export class FractalPainterWorker {

  // private static worker = new Worker('fractal-worker.js');

  public static async paint(fractal: FractalSet, area: Rectangle, width: number, height: number): Promise<ImageData> {

    const now = new Date().getTime();

    const worker = new Worker('fractal-worker.js');

    console.log('PAINT IN WORKER 0', new Date().getTime() - now, new Date().getTime());

    // const id = Math.random();

    worker.postMessage({
      // id,
      type: 'paint',
      params: {
        fractal: fractal.name,
        area,
        imageWidth: width,
        imageHeight: height
      }
    });

    return new Promise<ImageData>(success => {
      worker.onmessage = async (message: any) => {
        console.log('message FROM worker', message.type);
        success(message.data.imageData);

        await sleep();

        // worker.terminate();

        console.log('TOTAL', new Date().getTime() - now);
      };
    });
  }

  private calcColor(iterations: number): number {
    return 0;
  }
}
