import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';

export class FractalPainterWorker {

  private static readonly workerPoolSize = 4;
  private static lastWorker = 0;
  private static readonly workerPool = new Array(FractalPainterWorker.workerPoolSize).fill(0).map(
    () => new Worker('fractal-worker.js')
  );

  public static async paint(
    context: CanvasRenderingContext2D,
    fractal: FractalSet,
    area: Rectangle,
    width: number, height: number,
    palette: string[]
  ) {

    const now = new Date().getTime();

    FractalPainterWorker.paintChunk(
      fractal, area.leftTopQuadrant, Math.floor(width / 2), Math.floor(height / 2), palette
    ).then(imageData => {
      context.putImageData(imageData, 0, 0);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paintChunk(
      fractal, area.rightTopQuadrant, Math.ceil(width / 2), Math.floor(height / 2), palette
    ).then(imageData => {
      context.putImageData(imageData, width / 2, 0);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paintChunk(
      fractal, area.leftBottomQuadrant, Math.floor(width / 2), Math.ceil(height / 2), palette
    ).then(imageData => {
      context.putImageData(imageData, 0, height / 2);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });

    FractalPainterWorker.paintChunk(
      fractal, area.rightBottomQuadrant, Math.ceil(width / 2), Math.ceil(height / 2), palette
    ).then(imageData => {
      context.putImageData(imageData, width / 2, height / 2);
      // console.log('PAINTING TIME', new Date().getTime() - now);
    });
  }

  private static async paintChunk(
    fractal: FractalSet,
    area: Rectangle,
    width: number,
    height: number,
    palette: string[]
  ): Promise<ImageData> {

    const messageId = Math.random();

    FractalPainterWorker.lastWorker ++;
    const worker = FractalPainterWorker.workerPool[
      FractalPainterWorker.lastWorker % FractalPainterWorker.workerPoolSize
    ];

    worker.postMessage({
      id: messageId,
      type: 'paint',
      params: {
        fractal: fractal.name,
        area,
        imageWidth: width,
        imageHeight: height,
        palette
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
}
