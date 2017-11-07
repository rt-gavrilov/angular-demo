import {Component} from "@angular/core";
import {FractalSet} from "../algorithms/fractal-set";
import {FRACTALS_AVAILABLE} from "../algorithms/fractals-available";
import {AppearAnimation} from "../../utils/appear.animation";

@Component({
  selector: 'rt-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss'],
  animations: [
    AppearAnimation()
  ]
})
export class ShowroomComponent {
  public fractals: FractalSet[] = FRACTALS_AVAILABLE;
}
