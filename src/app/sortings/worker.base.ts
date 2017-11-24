import {byName} from "./algorithms/sortings";
import {Sorting} from "./algorithms/sorting";

class WorkerBase {

  public start() {

  }


  public complete(result: any) {

  }
}

// prevent TypeScript compile error
const customPostMessage: any = postMessage;

onmessage = function(event) {

  const sorting: Sorting = byName(event.data.type);

  sorting.run(event.data.array);

  customPostMessage(event.data.array);

  // worker data process
  // console.log('Web Worker ONE: Message received from main script');
  // console.log('Web Worker ONE: Posting message back to main script');
  // const workerResult = 'Result: ' + event.data + ' in Worker';
  //
  // if (jasmineSpecIsInBrowser) { // For jasmine tests running in browser
  //   if (!jasmineSpecPostMessageCallback) {
  //     throw Error('Need postMessage callback to run jasmine specs');
  //   } else {
  //     jasmineSpecPostMessageCallback(workerResult);
  //   }
  // } else { // running in worker
  //   customPostMessage(workerResult);
  // }

};

// Jasmine API
export const jasmineSpecWorkerAPI: any = {
  onmessage: onmessage,
  postMessage: ( cb: any ) => {
    jasmineSpecPostMessageCallback = cb;
  }
};
