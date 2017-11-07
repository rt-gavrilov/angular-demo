import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ResizeDetectorDirective} from "./resize-detector.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResizeDetectorDirective
  ],
  exports: [
    ResizeDetectorDirective
  ]
})
export class UtilsModule {}
