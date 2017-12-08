export class ArrayBuilder {

  private internal: number[];

  constructor(size: number) {
    this.internal = new Array(size);
  }

  public get raw(): number[] {
      return this.internal.slice();
  }

  public flat(value: number): ArrayBuilder {
    this.internal.fill(value);
    return this;
  }

  public ramp(): ArrayBuilder {
    for (let i = 0; i < this.internal.length; i++) {
      this.internal[i] = i;
    }
    return this;
  }

  public reverse(): ArrayBuilder {
    for (let i = 0; i < this.internal.length / 2; i++) {
      this.swap(i, this.internal.length - 1 - i);
    }
    return this;
  }

  public randomize(min: number = 1, max: number = 100): ArrayBuilder {
    for (let i = 0; i < this.internal.length; i++) {
      this.internal[i] = Math.round(Math.random() * (max - min) + min);
    }
    return this;
  }

  public shuffle(rate: number = 1): ArrayBuilder {
    for (let i = 0; i < this.internal.length; i++) {

      if (Math.random() > rate) {
        continue;
      }

      const index = Math.round(Math.random() * (this.internal.length - 1));
      this.swap(i, index);
    }
    return this;
  }

  private swap(i: number, j: number) {
      const temp = this.internal[i];
      this.internal[i] = this.internal[j];
      this.internal[j] = temp;
  }
}
