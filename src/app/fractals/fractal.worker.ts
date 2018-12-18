import {Rectangle} from '../utils/rectangle';
import {FractalSet} from './algorithms/fractal-set';
import {find} from './algorithms/fractals-available';

const worker: Worker = self as any;


worker.onmessage = function({data}) {

  const {type, params} = data;

  console.log('message TO worker', type, params);

  switch (type) {
    case 'paint':
      paint(
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
      break;
    default:
      throw new Error('Unsupported command');
  }
};


function paint(fractal: FractalSet, area: Rectangle, width: number, height: number) {

  console.log('PAINT', fractal.name, area.width, area.height, width, height);

  console.log('IN WORKER 1', new Date().getTime());

  const now = new Date().getTime();

  const result = new ImageData(width, height);

  let position = 0;

  const dx = area.width / width;
  const dy = area.height / height;

  const iterations = 128;

  for (let j = 0, y = area.top; j < height; j++, y += dy) {
    for (let i = 0, x = area.left; i < width; i++, x += dx) {

      const pointValue: number = fractal.getPoint(x, y, iterations);

      // result.data[position++] = 255;
      // result.data[position++] = 0;
      // result.data[position++] = 0;
      result.data[position++] = 8 * pointValue;
      result.data[position++] = 4 * pointValue;
      result.data[position++] = 2 * pointValue;
      result.data[position++] = 255;
    }
  }

  console.log('IN WORKER 1', new Date().getTime() - now);

  worker.postMessage({type: 'painted', imageData: result});

  console.log('IN WORKER 2', new Date().getTime() - now);
}
