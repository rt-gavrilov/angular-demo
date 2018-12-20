import {Rectangle} from '../utils/rectangle';
import {FractalSet} from './algorithms/fractal-set';
import {find} from './algorithms/fractals-available';
import {Error} from 'tslint/lib/error';
import gradstop from 'gradstop';

const worker: Worker = self as any;


worker.onmessage = function({data}) {

  const {id, type, params} = data;

  switch (type) {
    case 'paint':
      const image = paint(
        find(params.fractal),
        new Rectangle(
          params.area.left,
          params.area.top,
          params.area.right,
          params.area.bottom
        ),
        params.imageWidth,
        params.imageHeight
      );

      worker.postMessage({id, type: 'painted', imageData: image});

      break;
    default:
      throw new Error('Unsupported command');
  }
};


function paint(fractal: FractalSet, area: Rectangle, width: number, height: number): ImageData {

  const result = new ImageData(width, height);

  let position = 0;

  const dx = area.width / width;
  const dy = area.height / height;

  const iterations = fractal.numIterations;

  const histogram = new Array(iterations).fill(0);

  const now = new Date().getTime();

  const gradient: string[] = gradstop({
    stops: iterations,
    inputFormat: 'hex',
    colorArray: ['#FFF', '#00F', '#0F0', '#000']
  });

  const reds = new Array(iterations);
  const greens = reds.slice();
  const blues = reds.slice();

  for (let i = 0; i < gradient.length; i++) {
    const rgb: string[] = gradient[i].match(/rgb\((\d+), (\d+), (\d+)\)/);

    reds[i] = parseInt(rgb[1]);
    greens[i] = parseInt(rgb[2]);
    blues[i] = parseInt(rgb[3]);
  }

  for (let j = 0, y = area.top; j < height; j++, y += dy) {
    for (let i = 0, x = area.left; i < width; i++, x += dx) {

      const pointValue: number = fractal.getPoint(x, y, iterations);

      histogram[pointValue] ++;

      result.data[position++] = reds[pointValue];
      result.data[position++] = greens[pointValue];
      result.data[position++] = blues[pointValue];
      result.data[position++] = 255;
    }
  }

  console.log('WORKER TIME', new Date().getTime() - now);

  return result;
}
