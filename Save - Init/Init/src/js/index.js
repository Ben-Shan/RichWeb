import {Observable} from 'rxjs/Rx';

const display = document.getElementById("display");
const incButton = document.getElementById("increment");
const decButton = document.getElementById("decrement");
const resetButton = document.getElementById("reset");

let counter = 1;

const inc$ = Observable.fromEvent(incButton, 'click');
inc$.subscribe(ev => {
	display.innerHTML = counter++;
});

const rst$ = Observable.fromEvent(resetButton, 'click');
rst$.subscribe(ev => {
	counter = 1;
	display.innerHTML = 0;
});

const dec$ = Observable.fromEvent(decButton, 'click');
dec$.subscribe(ev => {
	display.innerHTML = counter--;
});
