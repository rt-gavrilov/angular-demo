import {Sorting} from './sorting';

export class InsertionSorting extends Sorting {

  readonly name = 'Insertion';

  run(array: number[]) {
    for (let i = 1; i < array.length; i++) {

      const valueToInsert = array[i];
      let indexToInsert = i;

      for (let j = i; j > 0; j--) {

        if (array[j - 1] <= valueToInsert) {
          break;
        }

        array[j] = array[j - 1];
        indexToInsert --;
      }

      array[indexToInsert] = valueToInsert;
    }
  }
}
