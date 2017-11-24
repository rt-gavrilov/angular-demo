import {Sorting} from "./sorting";
import {StrangeSorting} from "./strange-sorting";
import {BubbleSorting} from "./bubble-sorting";
import {ShakerSorting} from "./shaker-sorting";
import {SelectionSorting} from "./selection-sorting";
import {InsertionSorting} from "./insertion-sorting";
import {GnomeSorting} from "./gnome-sorting";
import {HeapSorting} from "./heap-sorting";
import {QuickSorting} from "./quick-sorting";
import {MergeSorting} from "./merge-sorting";
import {ShellSorting} from "./shell-sorting";

export const PRIMITIVES: Sorting[] = [
  new StrangeSorting(),
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

export const ALL: Sorting[] = PRIMITIVES.concat(... SMARTS);

export function byName(name: string): Sorting {
  return ALL.find(value => value.name === name);
}
