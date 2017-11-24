import {Sorting} from "./algorithms/sorting";
import {byName} from "./algorithms/sortings";

export class Runnable {
  public async run(args: any): Promise<any> {
    return {};
  }
}

export class SortingRunnable extends Runnable {
  public async run(data: {type: string, array: number[]}): Promise<any> {

    const now = new Date().getTime();

    const sorting: Sorting = byName(data.type);
    sorting.run(data.array);

    return new Date().getTime() - now;
  }
}

export class Thread {

  public async run(worker: Worker): Promise<any> {
    worker
  }

}
