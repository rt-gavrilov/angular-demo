export class Rectangle {
  constructor(
    public left: number = 0,
    public top: number = 0,
    public right: number = 0,
    public bottom: number = 0
  ) {}

  public get width() {
    return this.right - this.left;
  }

  public get height() {
    return this.bottom - this.top;
  }

  public zoom(coeff: number) {
    this.left += this.width * coeff / 2;
    this.right -= this.width * coeff / 2;
    this.top += this.height * coeff / 2;
    this.bottom -= this.height * coeff / 2;
  }

  public equals(to: Rectangle): boolean {
    return to.left === this.left &&
           to.right === this.right &&
           to.top === this.top &&
           to.bottom === this.bottom;
  }
}
