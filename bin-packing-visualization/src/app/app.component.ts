import { Component } from '@angular/core';

interface Rectangle {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bin-packing-visualization';

  rectangles: Rectangle[] = [
    { width: 200, height: 100 },
    { width: 100, height: 200 },
    { width: 50, height: 50 },
    { width: 150, height: 150 }
  ];

  containerWidth = 500;
  containerHeight = 500;

  packedRectangles: Rectangle[] = [];

  ngOnInit() {
    this.packedRectangles = this.packRectangles(this.rectangles, this.containerWidth, this.containerHeight);
  }

  packRectangles(rectangles: Rectangle[], containerWidth: number, containerHeight: number): Rectangle[] {
    const sortedRectangles = [...rectangles.slice().sort((a, b) => b.height - a.height)];
//     boxes.sort((a, b) => b.width * b.height - a.width * a.height);
    const nodes = [{ x: 0, y: 0, width: containerWidth, height: containerHeight }] as Rectangle[];
    const packedRectangles: Rectangle[] = [];

    for (const rectangle of sortedRectangles) {
      let i = 0;
      while (i < nodes.length) {
        const node = nodes[i];
        if (rectangle.width <= node.width && rectangle.height <= node.height) {
          const packedRectangle = {
            x: node.x,
            y: node.y,
            width: rectangle.width,
            height: rectangle.height,
          };
          packedRectangles.push(packedRectangle);
          nodes.splice(i, 1, ...this.splitNode(node, rectangle));

          break;
        } else {
          i++;
        }
      }
    }

    return packedRectangles;
  }

  splitNode(node: Rectangle, rectangle: Rectangle): Rectangle[] {
    const remainingWidth = node.width ?? 0 - rectangle.width;
    const remainingHeight = node.height - rectangle.height;

    if (remainingWidth > remainingHeight) {
      return [
        { x: (node?.x ?? 0), y: (node?.y ?? 0), width: (rectangle?.width ?? 0), height: (node?.height ?? 0) } as Rectangle,
        { x: (node?.x ?? 0) + (rectangle?.width ?? 0), y: (node?.y ?? 0), width: remainingWidth ?? 0, height: (node?.height ?? 0) } as Rectangle,
      ] as Rectangle[];
    } else {
      return [
        { x: (node?.x ?? 0), y: (node?.y ?? 0), width: node.width, height: rectangle.height } as Rectangle,
        { x: (node?.x ?? 0), y: (node?.y ?? 0) + (rectangle?.height ?? 0), width: (node?.width ?? 0), height: (remainingHeight ?? 0) } as Rectangle,
      ] as Rectangle[];
    }
  }
}
