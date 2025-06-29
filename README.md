# Radiance Cascades in p5.js

[Radiance Cascades](https://drive.google.com/file/d/1L6v1_7HY2X-LV3Ofb6oyTIxgEaP4LOI6/view?usp=sharing&ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) is a data structure that can be used to achieve high-quality, real-time global illumination, a long-standing challenge in interactive applications like video games.

This repository provides a [class](https://github.com/sobecblobec/radiance-cascades-p5js/blob/master/radiance-cascades.js?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) that can be used with [p5.js](https://p5js.org/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) sketches to implement 2D flatland radiance cascades. The examples below showcase what radiance cascades can look like in application. 


**Please note that the gifs contain artifacts due the nature of gifs**

<div align="center">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-basic.png" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-writing.png" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-rgb.png" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-springs.png" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-plinko.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-cloth.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-attraction.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-noise-field.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-angles-and-motion-sine-cosine.gif" width="400" height="400"> 
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-repetition-bezier.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-repetition-recursive-tree.gif" width="400" height="400">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-games-snake.gif" width="400" height="400">
</div>

## Usage
Using the [RadianceCascades](https://github.com/sobecblobec/radiance-cascades-p5js/blob/main/radiance-cascades.js?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) class is straightforward.

Create an instance of [RadianceCascades](https://github.com/sobecblobec/radiance-cascades-p5js/blob/main/radiance-cascades.js?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) and pass a [p5.Graphics](https://p5js.org/reference/p5/p5.Graphics/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) or [p5.Renderer](https://p5js.org/reference/p5/p5.Renderer/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) in the constructor.
```
canvas = createCanvas(300, 300)
rc = new RadianceCascades(canvas)

// OR

graphic = createGraphics(300, 300)
rc = new RadianceCascades(graphic)
```

Call the [draw()](https://github.com/sobecblobec/radiance-cascades-p5js/blob/main/radiance-cascades.js#L314?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) function on the instance of RadianceCascades that you created above. This function will return a [p5.Graphics](https://p5js.org/reference/p5/p5.Graphics/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) that can be displayed using [image()](https://p5js.org/reference/p5/image/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md). A complete and simple practical example can be seen below.
<table>
<tr>


<td>

```js
function setup() {
  canvas = createCanvas(300, 300);
}

function draw() {

  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 2);
  rect(width / 2, height / 2, width * 0.1);
  fill(255);
  rect(width * 0.66, height / 2, width * 0.1);
  fill("orange");
  rect(width * 0.33, height / 2, width * 0.1);

}
```

</td>

<td>

<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-example-no-rc.png" width="300" height="300">

</td>
</table>

<table>
<td>

```js
let canvas;
let rc;
function setup() {
  canvas = createCanvas(300, 300);

  noSmooth();
  rc = new RadianceCascades(canvas);
  rc.myCascadeNumber = 10;
  rc.myBaseIntervalLength = 0.1;
}

function draw() {
  clear();

  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 2);
  rect(width / 2, height / 2, width * 0.1);
  fill(255);
  rect(width * 0.66, height / 2, width * 0.1);
  fill("orange");
  rect(width * 0.33, height / 2, width * 0.1);

  image(rc.draw(), 0, 0);
}
```

</td>
<td>

<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-example-rc.png" width="300" height="300">

</td>
</tr>
</table>

