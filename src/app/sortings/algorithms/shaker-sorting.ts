import {Sorting} from './sorting';

export class ShakerSorting extends Sorting {

  readonly name = 'Shaker';

  run(array: number[]) {
    for (let right = array.length - 1, left = 0; right > 0; right--, left++) {
      for (let j = left; j < right; j++) {
        if (array[j] > array[j + 1]) {
          this.swap(array, j, j + 1);
        }
      }
      for (let j = right - 1; j > left; j--) {
        if (array[j-1] > array[j]) {
          this.swap(array, j, j - 1);
        }
      }
    }
  }
}
