import {Sorting} from '../algorithms/sorting';

export class SortingOptions {

  constructor(
    public comparisonMode: 'sameArray' | 'sameAlgorithm',
    public algorithms: Sorting[],
    public arrayTypes: {id: string, name: string}[],
    public arraySize: number
  ) {}

}
