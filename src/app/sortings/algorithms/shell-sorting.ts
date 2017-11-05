import {Sorting} from "./sorting";

export class ShellSorting extends Sorting {

  readonly name = "Shell";

  run(array: number[]) {
    let step = 1;
    while (step < array.length / 3) {
      step = step * 3 + 1;
    }

    while (step > 0) {
      for (let i = 0; i < step; i++) {
        this.insertionSortWithStep(array, i, step);
      }
      step = Math.floor((step - 1) / 3);
    }
  }

  private insertionSortWithStep(array: number[], from: number, step: number) {

    for (let i = from + step; i < array.length; i += step) {

      let valueToInsert = array[i];
      let indexToInsert = i;

      for (let j = i; j > from; j -= step) {
        if (array[j-step] > valueToInsert) {
          array[j] = array[j-step];
          indexToInsert -= step;
        } else {
          break;
        }
      }

      array[indexToInsert] = valueToInsert;
    }
  }
}
