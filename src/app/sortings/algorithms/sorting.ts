export abstract class Sorting {

  abstract readonly name: string;

  abstract run(array: number[]);

  protected swap(array: number[], i: number , j: number) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
