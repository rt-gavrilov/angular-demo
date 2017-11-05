import {Sorting} from "./sorting";

export class MergeSorting extends Sorting {

  readonly name = "Merge";

  private workspace: number[];
  private array: number[];

  run(array: number[]) {

    this.array = array;
    this.workspace = new Array(this.array.length);

    this.sortRange(0, this.array.length - 1);

    this.workspace = null;
  }

  private sortRange(from: number, to: number) {

    if (to == from) {
      return;
    }

    const middle: number = Math.floor( (from + to) / 2 );

    this.sortRange(from, middle);
    this.sortRange(middle + 1, to);

    this.merge(from, middle, middle + 1, to);

    this.copyRange(from, to);
  }

  private merge(from1: number, to1: number, from2: number, to2: number) {

    let index = from1;

    while (from1 <= to1 && from2 <= to2) {
      if (this.array[from1] > this.array[from2]) {
        this.workspace[index++] = this.array[from2++];
      } else {
        this.workspace[index++] = this.array[from1++];
      }
    }

    while (from1 <= to1) {
      this.workspace[index++] = this.array[from1++];
    }

    while (from2 <= to2) {
      this.workspace[index++] = this.array[from2++];
    }
  }

  private copyRange(fromIndex, toIndex) {
    for (let i = fromIndex; i <= toIndex; i++) {
      this.array[i] = this.workspace[i];
    }
  }
}
