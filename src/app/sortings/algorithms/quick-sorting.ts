import {Sorting} from './sorting';

export class QuickSorting extends Sorting {

  readonly name = 'Quick';

  run(array: number[]) {
    this.sortInterval(array, 0, array.length - 1);
  }

  private sortInterval(array: number[], from: number, to: number) {

    if (from >= to) {
      return;
    }

    let pivot = this.calcMedian(from, to);

    pivot = this.breakApart(array, from, to, pivot);

    this.sortInterval(array, from, pivot - 1);
    this.sortInterval(array, pivot + 1, to);
  }

  private calcMedian(from: number, to: number): number {
     return Math.round(Math.random() * (to - from)) + from;
  }

  private breakApart(array: number[], from: number, to: number, pivot: number): number {

    let left = from - 1;
    let right = to + 1;

    while (true) {

      while (left < to && array[++ left] < array[pivot]) {}
      while (right > left && array[-- right] > array[pivot]) {}

      if (left < right) {
        this.swap(array, left, right);
      } else {
        this.swap(array, right, pivot);
        break;
      }
    }

    return right;
  }
}
