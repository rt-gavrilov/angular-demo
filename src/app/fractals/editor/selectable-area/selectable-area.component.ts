import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Rectangle} from '../../../utils/rectangle';

@Component({
  selector: 'rt-selectable-area',
  templateUrl: './selectable-area.component.html',
  styleUrls: ['./selectable-area.component.css']
})
export class SelectableAreaComponent {

  @Output() select = new EventEmitter<Rectangle>();

  @ViewChild('container') container;

  public selectedArea: Rectangle;

  private widthToHeightRate: number;

  private get canvasBounds() {
    return this.container.nativeElement.getBoundingClientRect();
  }

  public onMouseDown(event: MouseEvent) {

    if (event.button !== 2) {
      return;
    }

    this.widthToHeightRate = this.canvasBounds.width / this.canvasBounds.height;

    console.log("RATE", this.widthToHeightRate);

    this.selectedArea = new Rectangle(
      event.pageX - this.canvasBounds.left,
      event.pageY - this.canvasBounds.top
    );
  }

  public onMouseUp(event: MouseEvent) {

    if (event.button !== 2) {
      return;
    }

    const width = this.canvasBounds.right - this.canvasBounds.left;
    const height = this.canvasBounds.bottom - this.canvasBounds.top;

    this.select.emit(
      new Rectangle(
        this.selectedArea.left / width,
        this.selectedArea.top / height,
        this.selectedArea.right / width,
        this.selectedArea.bottom / height
      )
    );

    this.selectedArea = null;
  }

  public onMouseMove(event: MouseEvent) {

    if ( ! this.selectedArea) {
      return;
    }

    const dx = event.pageX - this.canvasBounds.left;
    const dy = dx / this.widthToHeightRate - this.canvasBounds.top;

    this.selectedArea.right = dx;
    this.selectedArea.bottom = dy;

    // this.selectedArea.right = event.pageX - this.canvasBounds.left;
    // this.selectedArea.bottom = event.pageY - this.canvasBounds.top;
  }
}
