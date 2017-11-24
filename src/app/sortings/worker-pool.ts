import {sleep} from "../utils/async-utils";
import * as lodash from 'lodash';

export class WorkerPool {

  private static _instance: WorkerPool;
  public static get instance(): WorkerPool {
    if ( ! WorkerPool._instance) {
      WorkerPool._instance = new WorkerPool();
    }
    return WorkerPool._instance;
  }

  private constructor() {}

  private readonly maxWorkers: number = navigator.hardwareConcurrency - 1;
  private activeWorkers: Worker[] = [];

  public async enqueue(worker: Worker) {
    while (true) {
      if (this.activeWorkers.length < this.maxWorkers) {
        break;
      }
      await sleep(100);
    }

    this.activeWorkers.push(worker);

    console.log("WORKER POOL: ENQUEUE", this.activeWorkers.length);

    worker.addEventListener('message', message => this.onWorkerMessage(worker, message));
    // worker.addEventListener('error', event => {console.log("WORKER POOL: MESSAGE", event)});

    return worker;
  }

  private onWorkerMessage(worker: Worker, data: any) {
    lodash.pull(this.activeWorkers, worker);

    console.log('WORKER POOL: COMPLETED', this.activeWorkers.length);

    // worker.removeEventListener('message', this.onWorkerMessage);
  }


  // public async create(): Promise<Worker> {
  //
  //   let result;
  //
  //   while (true) {
  //     await sleep(100);
  //
  //     if (this.activeWorkers.length < this.maxWorkers) {
  //       result = new Worker();
  //       break;
  //     }
  //   }
  //
  //   result.onmessage( message => {});
  //   result.onerror( error => {});
  // }
}
