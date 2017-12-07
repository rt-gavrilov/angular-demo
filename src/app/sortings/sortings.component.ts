import {Component} from "@angular/core";
import {TdDigitsPipe} from "@covalent/core";
import {ALL, PRIMITIVES, SMARTS} from "./algorithms/sortings";
import {sleep} from "../utils/async-utils";
import {ArrayBuilder} from "../utils/array-builder";

import * as threads from 'threads';

import * as SortingWorker from 'worker-loader!./worker.bundle.js';
import {WorkerPool} from "./worker-pool";

@Component({
  selector: 'rt-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.css']
})
export class SortingsComponent {

  constructor() {
    console.log("threads", threads);
  }

  public useWorker = true;

  public readonly arrayTypes = [
    {id: "random", name: "Random"},
    {id: "asc", name: "Ascending"},
    {id: "desc", name: "Descending"},
    {id: "flat", name: "Flat"},
    {id: "asc90%", name: "Ascending mostly"},
    {id: "desc90%", name: "Descending mostly"}
  ];
  public arrayTypeSelected = this.arrayTypes[0];

  public readonly sortingSets = [
    {name: "All", value: ALL},
    {name: "Primitives", value: PRIMITIVES},
    {name: "Smarts", value: SMARTS}
  ];
  public sortingSetSelected = this.sortingSets[2];

  public chartData;

  public axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  public get sizes(): number[] {
    let coeff = this.sortingSetSelected.value == SMARTS ? 1e5 : 1e3;
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( value => value * coeff);
  }

  public async runWorker1() {
    const thread = threads.spawn(function(input, done) {
      // Everything we do here will be run in parallel in another execution context.
      // Remember that this function will be executed in the thread's context,
      // so you cannot reference any value of the surrounding code.
      done({ string : input.string, integer : parseInt(input.string) });
    });

    thread
      .send({ do : 'Something awesome!' })
      .on('message', function(message) {
        console.log('worker.js replied:', message);
      });
  }

  public async runWorker() {

    let temp = this.sortingSetSelected.value.map( value => ({
      name: value.name, series: []
    }));

    for (let size of this.sizes) {
      const arrayToSort = this.createArray(size);

      for (let sorting of this.sortingSetSelected.value) {

        const worker: Worker = new SortingWorker();

        await WorkerPool.instance.enqueue(worker);

        const now = new Date().getTime();

        worker.postMessage({ type: sorting.name, array: arrayToSort });
        worker.onmessage = result => {
          temp
            .find( value => value.name == sorting.name )
            .series.push({
            name: size,
            value: new Date().getTime() - now
          });

          this.chartData = temp.slice();
        };
      }

      // this.chartData = temp.slice();
    }
  }

  public async run() {

    if (this.useWorker) {
      this.runWorker();
      return;
    }

    let temp = this.sortingSetSelected.value.map( value => ({
      name: value.name, series: []
    }));

    for (let size of this.sizes) {

      for (let sorting of this.sortingSetSelected.value) {

        const now = new Date().getTime();

        sorting.run( this.createArray(size) );

        temp
          .find( value => value.name == sorting.name )
          .series.push({
            name: size,
            value: new Date().getTime() - now
          });
      }

      await sleep(500);

      this.chartData = temp.slice();
    }
  }

  private createArray(size: number): number[] {

    const builder = new ArrayBuilder(size);

    switch(this.arrayTypeSelected.id) {
      case "asc": builder.ramp(); break;
      case "desc": builder.ramp().reverse(); break;
      case "random": builder.randomize(1, 100); break;
      case "flat": builder.flat(10); break;
      case "asc90%": builder.ramp().shuffle(0.9); break;
      case "desc90%": builder.ramp().reverse().shuffle(0.9); break;
    }

    return builder.raw;
  }

  public readonly colorScheme = {
    domain: ['red', 'blue', 'cyan', 'magenta', 'yellow']
  };
}
