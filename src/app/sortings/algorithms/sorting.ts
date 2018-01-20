export abstract class Sorting {

  public abstract readonly name: string;

  public abstract run(array: number[]);

  protected swap(array: number[], i: number , j: number) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
