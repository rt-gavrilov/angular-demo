import {Sorting} from "./sorting";

export class HeapSorting extends Sorting {

  readonly name = "Heap";

  private heapSize: number;

  run(array: number[]) {

    this.heapSize = array.length;

    this.buildHeap(array);

    for (let i = array.length - 1; i > 0; i--) {
      this.swap(array, 0, i);
      this.heapSize --;
      this.heapify(array);
    }
  }

  private buildHeap(array: number[]) {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      this.heapify(array, i);
    }
  }

  private heapify(array: number[], index: number = 0) {

    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;

    if (leftIndex >= this.heapSize) {
      return;
    }

    let maxIndex;
    if (rightIndex >= this.heapSize) {
      maxIndex = leftIndex;
    } else {
      maxIndex = array[leftIndex] > array[rightIndex] ? leftIndex : rightIndex
    }

    if (array[index] < array[maxIndex]) {
      this.swap(array, index, maxIndex);
      this.heapify(array, maxIndex);
    }
  }
}
