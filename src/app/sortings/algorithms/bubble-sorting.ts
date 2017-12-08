import {Sorting} from './sorting';

export class BubbleSorting extends Sorting {

  readonly name = 'Bubble';

  run(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (array[j] > array[j + 1]) {
          this.swap(array, j, j + 1);
        }
      }
    }
  }
}
