import {Sorting} from './sorting';

export class GnomeSorting extends Sorting {

  readonly name = 'Gnome';

  run(array: number[]) {
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (array[j - 1] <= array[j]) {
          break;
        }
        this.swap(array, j, j - 1);
      }
    }
  }
}
