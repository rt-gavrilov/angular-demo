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

  public get leftTopQuadrant(): Rectangle {
    return new Rectangle(
      this.left, this.top,this.left + this.width / 2, this.top + this.height / 2
    );
  }

  public get rightTopQuadrant(): Rectangle {
    return new Rectangle(
      this.left + this.width / 2, this.top, this.right, this.top + this.height / 2
    );
  }

  public get leftBottomQuadrant(): Rectangle {
    return new Rectangle(
      this.left, this.top + this.height / 2,this.left + this.width / 2, this.bottom
    );
  }

  public get rightBottomQuadrant(): Rectangle {
    return new Rectangle(
      this.left + this.width / 2, this.top + this.height / 2,this.right, this.bottom
    );
  }

  public move(dx: number, dy: number): Rectangle {
    return new Rectangle(
      this.left + dx,
      this.top + dy,
      this.right + dx,
      this.bottom + dy
    );
  }

  public zoom(coeff: number): Rectangle {

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
