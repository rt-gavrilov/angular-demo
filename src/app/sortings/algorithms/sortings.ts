import {Sorting} from './sorting';
import {BubbleSorting} from './bubble-sorting';
import {ShakerSorting} from './shaker-sorting';
import {SelectionSorting} from './selection-sorting';
import {InsertionSorting} from './insertion-sorting';
import {GnomeSorting} from './gnome-sorting';
import {HeapSorting} from './heap-sorting';
import {QuickSorting} from './quick-sorting';
import {MergeSorting} from './merge-sorting';
import {ShellSorting} from './shell-sorting';

export const PRIMITIVES: Sorting[] = [
  // new StrangeSorting(),
  new BubbleSorting(),
  new ShakerSorting(),
  new SelectionSorting(),
  new InsertionSorting(),
  new GnomeSorting()
];

export const SMARTS: Sorting[] = [
  new HeapSorting(),
  new QuickSorting(),
  new MergeSorting(),
  new ShellSorting()
];

export const ALL: Sorting[] = [... PRIMITIVES, ... SMARTS];

export function find(name: string): Sorting {
  return ALL.find(sorting => sorting.name == name);
}
