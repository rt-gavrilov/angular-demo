import {Component} from '@angular/core';
import {TdDigitsPipe} from '@covalent/core';
import {sleep} from '../utils/async-utils';
import {ArrayBuilder} from '../utils/array-builder';
import {SortingOptions} from './options/options';
import {Sorting} from './algorithms/sorting';
import {WorkerPool} from '../utils/worker-pool';
import {curveMonotoneX}  from 'd3';

@Component({
  selector: 'rt-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.scss']
})
export class SortingsComponent {

  public options: SortingOptions;

  private readonly workerPool = new WorkerPool([new Worker('./sorting.worker', { type: 'module' })]);

  public running = false;

  public readonly colorScheme = {
    domain: [
      'red', 'orange', 'yellowgreen', 'goldenrod', 'green', 'blue', 'darkblue', 'cyan', 'magenta', 'purple'
    ]
  };

  public chartData;

  public get curve() {
    return curveMonotoneX;
  }

  public axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  private get sizes(): number[] {
    const size = this.options.arraySize;

    return new ArrayBuilder(11).ramp(0, size / 10).raw;
  }

  public onOptionsChange(value: SortingOptions) {
    this.options = value;
  }

  public async run() {

    this.running = true;

    if (this.options.comparisonMode === 'sameArray') {
      await this.compareAlgorithms();
    } else {
      await this.compareArrays();
    }

    this.running = false;
  }

  private async compareAlgorithms() {
    const interrupted = new Set<Sorting>();

    const chunk = this.options.algorithms.map( value => ({
      name: value.name,
      series: []
    }));

    for (const size of this.sizes) {

      const array = this.createArray(this.options.arrayTypes[0].id, size);

      for (const sorting of this.options.algorithms) {

        if (interrupted.has(sorting)) {
          continue;
        }

        const time = await this.sortAndMeasure(sorting, array.slice());

        chunk
          .find( value => value.name === sorting.name )
          .series.push({
            name: size,
            value: time
          });

        if (time > 500) {
          interrupted.add(sorting);
        }
      }

      await sleep(500);

      this.chartData = chunk.slice();
    }
  }

  private async compareArrays() {

    const interrupted = new Set<string>();

    const temp = this.options.arrayTypes.map(value => ({
      id: value.id,
      name: value.name,
      series: []
    }));

    for (const size of this.sizes) {

      for (const arrayType of this.options.arrayTypes) {

        if (interrupted.has(arrayType.id)) {
          continue;
        }

        const time = await this.sortAndMeasure(
          this.options.algorithms[0],
          this.createArray(arrayType.id, size)
        );

        temp
          .find( value => value.name === arrayType.name )
          .series.push({
            name: size,
            value: time
          });

        if (time > 500) {
          interrupted.add(arrayType.id);
        }
      }

      await sleep(500);

      this.chartData = temp.slice();
    }
  }

  private async sortAndMeasure(sorting: Sorting, array: number[]): Promise<number> {
    const result = await this.workerPool.run({type: 'sort', params: {sorting: sorting.name, array}});
    return result.time;
  }

  private createArray(type: string, size: number): number[] {

    const builder = new ArrayBuilder(size);

    switch (type) {
      case 'asc': builder.ramp(); break;
      case 'desc': builder.ramp().reverse(); break;
      case 'random': builder.randomize(1, 100); break;
      case 'flat': builder.flat(10); break;
      case 'asc90%': builder.ramp().shuffle(0.05); break;
      case 'desc90%': builder.ramp().reverse().shuffle(0.05); break;
    }

    return builder.raw;
  }
}
