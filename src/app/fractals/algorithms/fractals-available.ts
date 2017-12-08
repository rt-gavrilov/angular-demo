import {FractalSet} from './fractal-set';
import {MandelbrotFractalSet} from './mandelbrot-fractal-set';
import {NewtonFractalSet} from './newton-fractal-set';
import {JuliaFractalSet} from './julia-fractal-set';
import {SpiderFractalSet} from './spider-fractal-set';

export const FRACTALS_AVAILABLE: FractalSet[] = [
  new MandelbrotFractalSet(),
  new NewtonFractalSet(),
  new JuliaFractalSet(),
  new SpiderFractalSet()
];
