export default class Point {
  row: number;
  col: number;
  visited: boolean = false;

  constructor (row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  setVisited (val: boolean = true) {
    this.visited = val;
  }

  getRow () {
    return this.row;
  }

  getCol () {
    return this.col;
  }
}