import {Sorting} from './sorting';

export class StrangeSorting extends Sorting {

  readonly name = 'Strange';

  run(array: number[]) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[i] < array[j]) {
          this.swap(array, i, j);
        }
      }
    }
  }
}
