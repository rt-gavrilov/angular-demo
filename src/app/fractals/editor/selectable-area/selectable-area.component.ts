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

  private get canvasBounds() {
    return this.container.nativeElement.getBoundingClientRect();
  }

  public onMouseDown(event: MouseEvent) {
    this.selectedArea = new Rectangle(
      event.clientX - this.canvasBounds.left,
      event.clientY - this.canvasBounds.top
    );
  }

  public onMouseUp(event: MouseEvent) {
    if (this.selectedArea.width < 20) {
      this.selectedArea = null;
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

    const widthToHeightRate = this.canvasBounds.width / this.canvasBounds.height;

    this.selectedArea.right = event.clientX - this.canvasBounds.left;
    this.selectedArea.bottom = this.selectedArea.top + this.selectedArea.width / widthToHeightRate;
  }
}
