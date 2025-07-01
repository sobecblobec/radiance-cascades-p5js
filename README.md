# Radiance Cascades in p5.js

[Radiance Cascades](https://drive.google.com/file/d/1L6v1_7HY2X-LV3Ofb6oyTIxgEaP4LOI6/view?usp=sharing&ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) (RC) is a data structure that can be used to achieve high-quality, real-time global illumination, a long-standing challenge in interactive applications like video games.

This repository provides a [class](https://github.com/sobecblobec/radiance-cascades-p5js/blob/master/radiance-cascades.js?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) that can be used with [p5.js](https://p5js.org/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/master/README.md) sketches to implement 2D flatland radiance cascades right in your browser! The examples below showcase what radiance cascades can look like in application. 


**Please note that the gifs contain artifacts due the nature of gifs**

<table>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-basic.png?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt="White light illuminating the screen showing lighting achieved with radiance cascades.">
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-basic/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/DWjVU-GLY?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-writing.png?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Text written with a mouse that says "Wow this is cool!" to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-writing/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/ikL8EckfA?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>
</td>
</tr>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-rgb.png?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Red, blue, and green light creating a rainbow to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-rgb/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/VeGf8Ubvz?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-springs.png?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Two white rectangle lights illuminating a scene with many black circles blocking light to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-springs/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/26rw1em70?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://editor.p5js.org/mantissa/sketches/JewcMEDOy/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
</tr>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-plinko.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Colorful plinko balls are being dropped to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-plinko/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/QXk_7kzDw?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://editor.p5js.org/codingtrain/sketches/wAe_oPVHo/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-cloth.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Cloth physics being simulate to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-toxiclibs-cloth/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/VQ823u1DQ?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://editor.p5js.org/natureofcode/sketches/kMEEyVuFh/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
</tr>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-attraction.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='An orange light is centered with black squares being attracted to the light to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-toxiclibs-attraction/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/bgdJRQZk4?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://editor.p5js.org/natureofcode/sketches/tjIs8XaXP/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-noise-field.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='A red perlin noise field is being generated to the light to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-noise-field/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/vt5oGyMqi?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://editor.p5js.org/codingtrain/sketches/vDcIAbfg7/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
</tr>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-angles-and-motion-sine-cosine.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='A sin and cos graph being displayed to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-angles-and-motion-sine-cosine/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/Nc0JlodSn?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://p5js.org/examples/angles-and-motion-sine-cosine/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-repetition-bezier.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Rainbow bezier curves are displayed to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-repetition-bezier/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/HdpyN3nqy?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://p5js.org/examples/repetition-bezier/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
</tr>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-repetition-recursive-tree.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='Recursive tree displayed to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-repetition-recursive-tree/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/9Teeh7ph6?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://p5js.org/examples/repetition-recursive-tree/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/gifs/radiance-cascades-games-snake.gif?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md" width="100%" alt='The game snake is being played to show global illumination achieved with radiance cascades.'>
<br />
<a href="https://pages.sobecblobec.com/examples/radiance-cascades-games-snake/index.html?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a> <a href="https://editor.p5js.org/sobecblobec/sketches/qj3qcSHox?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">(alternative link)</a>

<a href="https://p5js.org/examples/games-snake/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Original Sketch Without Radiance Cascades</a>
</td>
</tr>
</table>

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

<div align="center" width="100%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-example-no-rc.png" width="50%">
</div>

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





<div align="center" width="100%">
<img src="https://raw.githubusercontent.com/sobecblobec/radiance-cascades-p5js/main/media/images/radiance-cascades-example-rc.png" width="50%">

</div>
<div align="center" width="100%">
<a href="https://pages.sobecblobec.com/?ref=https://github.com/sobecblobec/radiance-cascades-p5js/edit/main/README.md">Live Demo</a>
</div>

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


