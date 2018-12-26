import {Rectangle} from '../../utils/rectangle';
import {FractalSet} from './fractal-set';
import {WorkerPool} from '../../utils/worker-pool';

export class FractalPainterWorker {

  private static readonly workerPool = new WorkerPool('fractal-worker.js', 4);

  public static async paint(
    context: CanvasRenderingContext2D,
    fractal: FractalSet,
    area: Rectangle,
    width: number, height: number,
    palette: string[]
  ) {

    // const now = new Date().getTime();

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

    return FractalPainterWorker.workerPool.run({
      type: 'paint',
      params: {
        fractal: fractal.name,
        area,
        imageWidth: width,
        imageHeight: height,
        palette
      }
    }).then(data => data.imageData);
  }
}
