import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ALL, PRIMITIVES, SMARTS} from '../algorithms/sortings';
import {SortingOptions} from './options';
import {Sorting} from '../algorithms/sorting';

@Component({
  selector: 'rt-sorting-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class SortingOptionsComponent implements OnInit {

  @Input() disabled = false;

  @Output() change = new EventEmitter<SortingOptions>();

  public comparisonMode: 'sameArray' | 'sameAlgorithm' = 'sameArray';

  public readonly arrayTypes = [
    {id: 'random', name: 'Random'},
    {id: 'asc', name: 'Ascending'},
    {id: 'desc', name: 'Descending'},
    {id: 'flat', name: 'Flat'},
    {id: 'asc90%', name: 'Ascending mostly'},
    {id: 'desc90%', name: 'Descending mostly'}
  ];
  public arrayTypeSelected = this.arrayTypes[0];

  public algorithms = ALL;
  public algorithmsChosen: Set<Sorting> = new Set(ALL);
  public algorithmChosen = ALL[0];

  public arraySizes = [5, 10, 50, 100, 500].map(value => value * 1e3);
  public arraySize = 10e3;

  public ngOnInit() {
    this.emit();
  }

  public emit() {

    const options = new SortingOptions(this.comparisonMode, [], [], this.arraySize);

    if (this.comparisonMode === 'sameArray') {
      options.algorithms = Array.from(this.algorithmsChosen.keys());
      options.arrayTypes = [this.arrayTypeSelected];
    } else {
      options.algorithms = [this.algorithmChosen];
      options.arrayTypes = this.arrayTypes;
    }

    this.change.emit(options);
  }

  public onAlgorithmChosen(value: Sorting, checked: boolean) {
    this.algorithmsChosen.delete(value);
    if (checked) {
      this.algorithmsChosen.add(value);
    }
    this.emit();
  }

  public get allPrimitivesChosen(): boolean {
    return PRIMITIVES.every(value => this.algorithmsChosen.has(value));
  }

  public get allSmartsChosen(): boolean {
    return SMARTS.every(value => this.algorithmsChosen.has(value));
  }

  public togglePrimitives() {
    if (this.allPrimitivesChosen) {
      PRIMITIVES.forEach( value => this.algorithmsChosen.delete(value));
    } else {
      PRIMITIVES.forEach( value => this.algorithmsChosen.add(value));
    }
    this.emit();
  }

  public toggleSmarts() {
    if (this.allSmartsChosen) {
      SMARTS.forEach( value => this.algorithmsChosen.delete(value));
    } else {
      SMARTS.forEach( value => this.algorithmsChosen.add(value));
    }
    this.emit();
  }
}
