import {find} from './algorithms/sortings';
import {Error} from 'tslint/lib/error';
import {Sorting} from './algorithms/sorting';

const worker: Worker = self as any;


worker.onmessage = function({data}) {

  const {id, type, params} = data;

  switch (type) {
    case 'sort':

      const now = new Date().getTime();

      sort(params.array, find(params.sorting));

      worker.postMessage({id, type: 'sorted', time: new Date().getTime() - now});

      break;
    default:
      throw new Error('Unsupported command');
  }
};


function sort(array: number[], sorting: Sorting): number[] {
  return sorting.run(array);
}
