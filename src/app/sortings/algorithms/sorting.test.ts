import {Sorting} from "./sorting";
import {StrangeSorting} from "./strange-sorting";
import {BubbleSorting} from "./bubble-sorting";
import {ShakerSorting} from "./shaker-sorting";
import {SelectionSorting} from "./selection-sorting";
import {InsertionSorting} from "./insertion-sorting";
import {GnomeSorting} from "./gnome-sorting";
import {HeapSorting} from "./heap-sorting";
import {QuickSorting} from "./quick-sorting";
import {MergeSorting} from "./merge-sorting";
import {ShellSorting} from "./shell-sorting";
import {ArrayBuilder} from "../../utils/array-builder";

export class SortingTest {

  private readonly SORTINGS: Sorting[] = [
    new StrangeSorting(),
    new BubbleSorting(),
    new ShakerSorting(),
    new SelectionSorting(),
    new InsertionSorting(),
    new GnomeSorting(),
    new HeapSorting(),
    new QuickSorting(),
    new MergeSorting(),
    new ShellSorting()
  ];

  private readonly ARRAYS = [
    new ArrayBuilder(5).ramp().raw,
    new ArrayBuilder(100).ramp().raw,
    new ArrayBuilder(100).ramp().randomize().raw,
    new ArrayBuilder(100).ramp().flat(1).raw,
    new ArrayBuilder(100).ramp().reverse().raw
  ];

  run() {

    for (let sorting of this.SORTINGS) {
      for (let array of this.ARRAYS) {

        let arrayCopy = array.slice();

        sorting.run(arrayCopy);

        let success = this.checkSorted(arrayCopy);
        if (success)
          console.log("Sort after", sorting.name, "SUCCESS");
        else
          console.warn("Sort after", sorting.name, "FAIL");
      }
    }

  }

  private checkSorted(array: number[]): boolean {

    let prev = array[0];
    for (let i = 1; i < array.length; i++) {
      if (prev > array[i]) {
        return false;
      }
    }

    return true;
  }

}
