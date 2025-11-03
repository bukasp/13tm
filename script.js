/**@type {HTMLCanvasElement} */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const roadLine = svgPoint.split(' ');

//--- инфо кнопки
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const revers = document.querySelector('.revers');
const information = document.querySelector('.info');
const time = document.querySelector('.time');
let clock = [14, 19, 55];
let movement = false;
let backMove = false;
let timer = points.length - 1;
//---------------
function info() {
	// information.innerHTML = 'Точка: ' + timer + '</br>';
	information.innerHTML = clock[0] + ':' + clock[1] + ':' + clock[2];
}

// -----------
const grafik = {
	triumfMatr: [[14, 20], [14, 23]],
	matrTriumf: [[14, 24], [14, 27]]
}
const distance = {
	triumfMatr: [3427, 3079],
	matrTriumf: [3079, 2499],
	triumfMetall: [2499, 1891],
	metallMonol: [1891, 1266],
	monolMetall: [1266, 396],
	metallTriumf: [396, 0, 3695, 3427]
}


// ---------------


const stationPoint = [3079, 3427, 2499, 1891, 1266, 396];
function station() {
	for (let i = 0; i <= stationPoint.length - 1; i++) {


		ctx.beginPath();
		ctx.arc(points[stationPoint[i]].x, points[stationPoint[i]].y, 5, 0, 2 * Math.PI);

		ctx.fillStyle = 'rgba(223, 52, 180, 1)';

		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
		ctx.stroke();
		ctx.closePath();
	}
}

// pause.addEventListener('click', function () {
//     movement = false;
//     backMove = false;
// });
// play.addEventListener('click', function () {
//     backMove = false;
//     movement = true;
// });
// revers.addEventListener('click', function () {
//     movement = false;
//     backMove = true;
// });

let timeNow;
let timeGrafikPercent;
let distanceNow;
let indexNow;

function now() {
	timeNow = clock[0] * 24 + clock[1] * 60 + clock[2];
	its100percent = (grafik.triumfMatr[1][0] * 24 + grafik.triumfMatr[1][1] * 60) - (grafik.triumfMatr[0][0] * 24 + grafik.triumfMatr[0][1] * 60); // 100 % времени triumfMatr
	itsWhatIsTimeSecond = timeNow - (grafik.triumfMatr[0][0] * 24 + grafik.triumfMatr[0][1] * 60);
	itsTimeIsTimePersent = itsWhatIsTimeSecond / its100percent * 100; // процент времени ДАААА 


	distanceNow = distance.triumfMatr[0] - distance.triumfMatr[1];
	indexNow = Math.round(distance.triumfMatr[0] - (distanceNow / 100 * itsTimeIsTimePersent));

	// console.log(indexNow);
}


requestAnimationFrame(move);
function move() {
	now();
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	// ------------- Рисуется дорога 
	// ctx.beginPath();
	// for (let i = 0; i <= roadLine.length; i++) {
	// 	if ('M' == roadLine[i]) {
	// 		ctx.moveTo(roadLine[i + 1], roadLine[i + 2]);
	// 	}
	// 	else if ('C' == roadLine[i]) {
	// 		ctx.bezierCurveTo(roadLine[i + 1], roadLine[i + 2], roadLine[i + 3], roadLine[i + 4], roadLine[i + 5], roadLine[i + 6]);
	// 	}
	// 	else if ('L' == roadLine[i]) {
	// 		ctx.lineTo(roadLine[i + 1], roadLine[i + 2]);
	// 	}
	// 	else if ('Z' == roadLine[i]) {
	// 		ctx.lineTo(roadLine[1], roadLine[2]);
	// 	}
	// }
	// ctx.lineWidth = 3;
	// ctx.strokeStyle = 'rgb(70, 163, 224)';
	// ctx.stroke();
	// ctx.closePath();



	// --------------
	ctx.beginPath();
	ctx.moveTo(indexPath[0].x, indexPath[0].y);
	for (let i = 0; i <= indexPath.length - 1; i++) {
		ctx.lineTo(indexPath[i].x, indexPath[i].y);		
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgb(70, 163, 224)';
	ctx.stroke();
	ctx.closePath();
	// ------------- Рисуется остановка
	station();

	// --------------
	ctx.beginPath();
	ctx.arc(points[indexNow].x, points[indexNow].y, 9, 0, 2 * Math.PI);
	ctx.fillStyle = 'rgba(50, 197, 148, 1)';
	// if (movement === false || backMove === false) {
	//     ctx.fillStyle = 'rgba(223, 206, 52, 1)';
	// }
	// if (movement === true || backMove === true) {
	//     ctx.fillStyle = 'rgba(50, 197, 148, 1)';
	// }

	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
	ctx.stroke();
	ctx.closePath();


	ctx.font = '20px system-ui';
	// ctx.fillStyle = 'rgba(212, 212, 212, 1)';
	if (movement === false || backMove === false) {
		ctx.fillStyle = 'rgba(223, 206, 52, 1)';
	}
	if (movement === true || backMove === true) {
		ctx.fillStyle = 'rgba(50, 197, 148, 1)';
	}
	if (points[indexNow].y <= 35) {
		ctx.fillText(201, points[indexNow].x - 15, points[indexNow].y + 30);
	}
	else ctx.fillText(201, points[indexNow].x - 15, points[indexNow].y - 20);
	// --------------


	if (movement === true) {
		timer -= 1;
	}
	if (backMove === true) {
		timer += 1;
	}
	else if (movement === false || backMove === false) {
		timer = timer;
	}
	if (timer <= 0 && backMove === false) timer = points.length - 1;
	if (timer >= points.length - 1 && backMove === true) timer = 0;
	info();
	///...

	requestAnimationFrame(move);
}
// console.log(timer);
// console.log(roadLine.length);
// console.log('movement ' + movement);
// console.log('backmove ' + backMove);

function clockFunction() {
	clock[2] += 1;
	if (clock[2] === 60) {
		clock[1] += 1;
		clock[2] = 0;
	}
	if (clock[1] === 60) {
		clock[0] += 1;
		clock[1] = 0;
	}
	if (clock[0] === 24) {
		clock[0] = 0;
	}
}
// let 
// function drawTimeClock() {
//     if (clock[0].length === 1)
// }

setInterval(() => {
	clockFunction(); 1
}, 1000);

// console.log(b203);
// console.log('roadLine: ' + roadLine);
// console.log(points);
