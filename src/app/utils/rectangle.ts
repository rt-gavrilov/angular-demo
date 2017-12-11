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

    const prevWidth = this.width;
    const prevHeight = this.height;

    const newWidth = this.width / coeff;
    const newHeight = this.height / coeff;

    return new Rectangle(
      this.left + (newWidth - prevWidth) / -2,
      this.top + (newHeight - prevHeight) / -2,
      this.right - (newWidth - prevWidth) / -2,
      this.bottom - (newHeight - prevHeight) / -2
    );
  }

  public clone(): Rectangle {
    return new Rectangle(this.left, this.top, this.right, this.bottom);
  }

  public equals(to: Rectangle): boolean {
    return to.left === this.left &&
           to.right === this.right &&
           to.top === this.top &&
           to.bottom === this.bottom;
  }
}
