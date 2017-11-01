import Rx from 'rxjs/Rx';

const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const splits = document.getElementById('splits');

const source = Rx.Observable.interval(100).timeInterval();

let begin = false;
let time = 0;

const Sub = source.subscribe(
  sub => {
    if(!begin) return;
    time++;
    timer.innerHTML = 
	Math.floor(time / 600) + ":" + 
	Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });

Rx.Observable.fromEvent(document.getElementById('start'), 'click')
  .subscribe(e => {
    begin = true;
  });

Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
  .subscribe(e => {
    begin = false;
  });

Rx.Observable.fromEvent(document.getElementById('split'), 'click')
  .subscribe(e => {
    splits.innerHTML += timer.innerHTML + "<br/>";
  });

Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
  .subscribe(e => {
    begin = false;
    time = 0;
    timer.innerHTML = "0:0:00";
    splits.innerHTML = "";
  });

  
var context = canvas.getContext("2d");
var radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 9/10;

window.setInterval(function(){
	drawClock();
}, 100);

function drawClock() {
	
	context.beginPath();
    context.arc(0, 0, radius, 0 , 2*Math.PI);
    context.fillStyle = "white";
    context.fill();
	drawFace();
	drawLines(context, radius);
	drawTime(context, radius);	
}
function drawFace(){

	context.lineWidth = radius*0.01;
	context.stroke();
	context.beginPath();
	context.arc(0, 0, radius*0.01, 0, 2*Math.PI);
	context.fillStyle = 'black';
	context.fill();
	
	    
}
function drawLines(context, radius) {
    var ang;
    var num;
    context.font = radius*.2;
    context.textBaseline="middle";
    context.textAlign="center";
    for(num= 0; num < 12; num++){
        ang = num * Math.PI / 6;
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.rotate(-ang);
        context.fillText("o", 0, 0);
        context.rotate(ang);
        context.translate(0, radius*0.85);
        context.rotate(-ang);
			
    }
}

function drawTime(context, radius){

	var minute = time/1200;
	var second = time/10;
	
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHands(context, minute, radius*0.8, radius*0.02);
    
    second=(second*Math.PI/30);
    drawHands(context, second, radius*0.9, radius*0.01);
}

function drawHands(context, pos, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0,0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
}
