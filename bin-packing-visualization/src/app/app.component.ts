// https://www.geeksforgeeks.org/bin-packing-problem-minimize-number-of-used-bins

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rectangles: Rectangle[] = [
    { width: 20, height: 5, color: 'red' },
    { width: 7, height: 18, color: 'blue' },
    { width: 7, height: 18, color: 'green' },
    { width: 6, height: 32, color: 'yellow' },
    { width: 48, height: 50, color: 'grey' },
    { width: 3, height: 7, color: 'cyan' },
    //{ width: 80, height: 60, color: 'black' },
  ]

  positions: { x: number, y: number }[] = [];

  ngOnInit() {
    const bins = this.packRectangles(this.rectangles, 50, 80);

    let x = 0, y = 0;

    for (const bin of bins) {
      for (const rect of bin) {
        this.positions.push({ x, y });
        x += rect?.width;
      }

      x = 0;
      y += bin.reduce((sum, rect) => sum + rect.height, 0);
    }
  }

packRectangles(rectangles: Rectangle[], binWidth: number, binHeight: number): Rectangle[][] {
  const bins: Rectangle[][] = [[]];
  let currentBinHeight = 0;

  rectangles.sort((a, b) => b.height - a.height);

  for (const rectangle of rectangles) {
    if (rectangle.width > binWidth || rectangle.height > binHeight) {
      throw new Error('Rectangle too large for bin');
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

}

export class Rectangle {
  width: number;
  height: number;
  color: string;
}

