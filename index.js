import "./main.css";
import {
  Observable
} from "rxjs/Rx";

// hot reload index.html
if (process.env.NODE_ENV !== "production") {
  require("./index.html");
}

// subcribe window event resize
Observable.fromEvent(window, "load").subscribe(resize);
Observable.fromEvent(window, "resize").subscribe(resize);
// panel
const canvas = document.getElementById("canvas");
// context
const ctx = canvas.getContext("2d");
ctx.strokeStyle = '#000';
// resize panel
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
// lineTo
function draw(e) {
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
}

function moveTo(e) {
  ctx.moveTo(e.clientX, e.clientY)
}

Observable.fromEvent(canvas, 'mousedown')
  // when mousedown move to mouse location first
  .do(e => moveTo(e))
  // then start listen mousemove
  .flatMap(
    e => Observable.fromEvent(canvas, 'mousemove')
    // untail mouseup
    .takeUntil(Observable.fromEvent(canvas, 'mouseup'))
  ).subscribe(e => {
    draw(e)
  })