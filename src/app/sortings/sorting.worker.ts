/// <reference lib="webworker" />

import {find} from './algorithms/sortings';
import {Sorting} from './algorithms/sorting';

// const worker: Worker = self as any;

addEventListener('message', ({ data }) => {

    const {id, type, params} = data;

    switch (type) {
        case 'sort':

            const now = new Date().getTime();

            sort(params.array, find(params.sorting));

            postMessage({id, type: 'sorted', time: new Date().getTime() - now});

            break;
        default:
            throw new Error(`Unsupported command '${type}'`);
    }
});


console.log('SORTING WORKER');

// worker.onmessage = function({data}) {
//
//   const {id, type, params} = data;
//
//   switch (type) {
//     case 'sort':
//
//       const now = new Date().getTime();
//
//       sort(params.array, find(params.sorting));
//
//       worker.postMessage({id, type: 'sorted', time: new Date().getTime() - now});
//
//       break;
//     default:
//       throw new Error(`Unsupported command '${type}'`);
//   }
// };


function sort(array: number[], sorting: Sorting): number[] {
  return sorting.run(array);
}
