import {Rectangle} from '../utils/rectangle';
import {FractalSet} from './algorithms/fractal-set';
import {find} from './algorithms/fractals-available';
import {Error} from 'tslint/lib/error';
import Rainbow from 'rainbowvis.js';

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
        params.imageHeight,
        params.palette
      );

      worker.postMessage({id, type: 'painted', imageData: image});

      break;
    default:
      throw new Error('Unsupported command');
  }
};


function paint(fractal: FractalSet, area: Rectangle, width: number, height: number, palette: string[]): ImageData {

  const result = new ImageData(width, height);

  let position = 0;

  const dx = area.width / width;
  const dy = area.height / height;

  const iterations = fractal.numIterations;

  const now = new Date().getTime();

  const rainbow = new Rainbow();
  rainbow.setNumberRange(0, iterations - 1);
  rainbow.setSpectrum(...palette);

  const reds = new Array(iterations);
  const greens = reds.slice();
  const blues = reds.slice();


  for (let i = 0; i < iterations; i++) {
    const rgb = rainbow.colourAt(i);

    reds[i] = parseInt(rgb.substr(0, 2), 16);
    greens[i] = parseInt(rgb.substr(2, 2), 16);
    blues[i] = parseInt(rgb.substr(4, 2), 16);
  }

  for (let j = 0, y = area.top; j < height; j++, y += dy) {
    for (let i = 0, x = area.left; i < width; i++, x += dx) {

      const pointValue: number = fractal.getPoint(x, y, iterations) - 1;

      result.data[position++] = reds[pointValue];
      result.data[position++] = greens[pointValue];
      result.data[position++] = blues[pointValue];
      result.data[position++] = 255;
    }
  }

  console.log('WORKER TIME', new Date().getTime() - now);

  return result;
}
