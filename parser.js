// console.logparseSvg);
//
// svgPoint
// parseSvg
let x;
let y;



const parseSvg = svgPoint.split(' ');
const indexPath = [];


for (let i = 0; i <= parseSvg.length; i++) {
	if (parseSvg[i] === 'M') {
		indexPath.push({'x': parseSvg[i + 1], 'y': parseSvg[i + 2]});
	}
	if (parseSvg[i] === 'L') {
		indexPath.push({'x': parseSvg[i + 1], 'y': parseSvg[i + 2]});
	}
	if (parseSvg[i] === 'C') {
		indexPath.push({'x': parseSvg[i + 5], 'y': parseSvg[i + 6]});
	}
	if (parseSvg[i] === 'Z') {
		indexPath.push({'x': parseSvg[1], 'y': parseSvg[2]});
	}

	// indexPath.push({'x': x, 'y': y});
}

console.log(indexPath);9
