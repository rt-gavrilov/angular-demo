export class WorkerPool {

  private messageCounter = 0;
  private lastWorker = 0;
  private workers: Worker[];

  constructor(workerFactory: () => Worker, size = 4) {
      this.workers = new Array(size).fill(0).map(() => workerFactory());
  }

  public async run(command: {type: string, params: any}): Promise<any> {

    const messageId = this.messageCounter;

    this.messageCounter ++;
    this.lastWorker ++;
    const worker = this.workers[this.lastWorker % this.workers.length];

    worker.postMessage({
      id: messageId,
      type: command.type,
      params: command.params
    });

    let outsideResolve;
    const result = new Promise(success => {
      outsideResolve = success;
    });

    const listener = message => {
      if (message.data.id == messageId) {
        worker.removeEventListener('message', listener);
        outsideResolve(message.data);
      }
    };

    worker.addEventListener('message', listener);

    return result;
  }
}
