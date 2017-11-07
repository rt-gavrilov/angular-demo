import {Component} from "@angular/core";
import {TdDigitsPipe} from "@covalent/core";
import {ALL, PRIMITIVES, SMARTS} from "./algorithms/sortings";
import {sleep} from "../utils/async-utils";
import {ArrayBuilder} from "../utils/array-builder";

@Component({
  selector: 'rt-sortings',
  templateUrl: './sortings.component.html',
  styleUrls: ['./sortings.component.css']
})
export class SortingsComponent {

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

  public async run() {

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
