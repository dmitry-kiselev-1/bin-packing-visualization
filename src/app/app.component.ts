// https://www.geeksforgeeks.org/bin-packing-problem-minimize-number-of-used-bins
//https://intranet.csc.liv.ac.uk/~epa/surveyhtml.html

import { Component } from '@angular/core';
import { Algorithm } from './algorithm.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  errorMessage = "";

  inputData: string =
`80 50
20 5
7 18
7 18
6 32
48 50
3 7
80 6`

  binHeight = 80;
  binWidth = 50;

  algorithm: Algorithm = Algorithm.NextFitDecreasingHeightAlgorithm;
  rectangles: Rectangle[] = [];

  positions: { x: number, y: number }[] = [];

  ngOnInit() {
  }

  nextFitAlgorithm(rectangles: Rectangle[], binWidth: number, binHeight: number): Rectangle[][] {
    const bins: Rectangle[][] = [[]];
    let currentBinHeight = 0;

    rectangles.sort((a, b) => b.height - a.height);

    for (const rectangle of rectangles) {
      if (rectangle.width > binWidth || rectangle.height > binHeight) {
        this.errorMessage = `Rectangle \n [${rectangle.width} ${rectangle.height}] \n too large for bin and will be ignored!`;
      }

      if (currentBinHeight + rectangle.height > binHeight) {
        bins.push([]);
        currentBinHeight = 0;
      }

      bins[bins.length - 1].push(rectangle);
      currentBinHeight += rectangle.height;
    }

    return bins;
  }

  visualize(algorithm: Algorithm) {

    let bins: Rectangle[][] = [[]];

    switch (algorithm) {
      case Algorithm.NextFitDecreasingHeightAlgorithm:
        bins = this.nextFitAlgorithm(this.rectangles, this.binWidth, this.binHeight);
        break;
      case Algorithm.OtherAmazingAlgorithm:
        // ToDo...
        break;
    }

    let x = 0, y = 0;

    for (const bin of bins) {
      for (const rect of bin) {
        this.positions.push({x, y});
        x += rect?.width;
      }

      x = 0;
      y += bin.reduce((sum, rect) => sum + rect.height, 0);
    }
  }

  packAndVisualizeButtonClick() {
    this.errorMessage = "";
    this.readInputData();
    this.visualize(this.algorithm);
  }

  selectAlgorithmChange(algorithm: Algorithm) {
    this.algorithm = algorithm;
  }

  getRandomColor(): string {
    return `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;
  }

  readInputData() {
    try {
    let inputArray = this.inputData.split('\n');
    let inputRectangles = inputArray.map(i => ({
      width: +i.split(' ')[0],
      height: +i.split(' ')[1],
      color: this.getRandomColor()}));

    const binSize = inputRectangles.shift();
    const binWidth = binSize?.width ?? 0;
    const binHeight = binSize?.height ?? 0;
    this.binWidth = binWidth > binHeight ? binHeight : binWidth;
    this.binHeight = binWidth > binHeight ? binWidth : binHeight;
    this.rectangles = [...inputRectangles];
    }
    catch (e) {
      this.errorMessage = 'Wrong input data, please reload page to see example!';
    }
  }

  inputDataChange(e: any) {
    debugger;
    let x = e.target.value;
  }

}

export class Rectangle {
  width: number;
  height: number;
  color: string;
}

