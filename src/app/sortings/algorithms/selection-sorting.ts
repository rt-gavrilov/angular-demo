import {Sorting} from "./sorting";

export class SelectionSorting extends Sorting {

  readonly name = "Selection";

  run(array: number[]) {
    for (let i = 0; i < array.length; i++) {

      let minIndex = i;

      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      this.swap(array, minIndex, i);
    }
  }
}
