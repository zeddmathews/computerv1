const args = process.argv;
var a;
var b;
var c;
const discriminant = (b * b) -(4 * (a * c));
const posQuadraticFormula = ((-b + /*squareRoot*/discriminant) / 2 * a);
const negQuadraticFormula = ((-b - /*squareRoot*/discriminant) / 2 * a);
var expr;

// $>./computor "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"
// Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0
// Polynomial degree: 2
// Discriminant is strictly positive, the two solutions are:
// 0.905239
// -0.475131
// $>./computor "5 * X^0 + 4 * X^1 = 4 * X^0"
// Reduced form: 1 * X^0 + 4 * X^1 = 0
// Polynomial degree: 1
// The solution is:
// -0.25
// ./computor "8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0"
// Reduced form: 5 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 0
// Polynomial degree: 3
// The polynomial degree is stricly greater than 2, I can't solve.

const argsHandler = (args) => {
	if (args.length != 3) {
		console.log(`Usage: node computerv1.js \"expression\"`);
		process.exit(1);
	}
	else {
		polynomial(args);
	}
}

const polynomial = (expr) => {
	// always reduce equation first
	var polySplit = expr[2].split(`=`);
	var polyKV = {
		leftSide : polySplit[0].trim().split(` `),
		rightSide : polySplit[1].trim().split(` `)
	};
	// console.log(polyKV);
	reducedForm(polyKV);
	var polyDegree;
	var discriminant;
	console.log(`Polynomial degree: (can read if it's greater than 2, doesn't solve tho)`);
	console.log(`Sign of discriminant (whatever the fuck that is) if it exists and solution(s)`);
}

const weirdPowers = (leftSplit, rightSplit) => {
	var err = [];
	for (var leftI = 0; leftI < leftSplit.length; leftI++) {
		if (leftSplit[leftI].includes(`^`)) {
			var leftPowerSplit = leftSplit[leftI].split(`^`);
			if (leftPowerSplit[1][0] == `-`) err.push(`${leftSplit[leftI]} contains a negative power`);
			if (leftPowerSplit[1].includes(`/`)) err.push(`${leftSplit[leftI]} contains a fractional exponent`);
		}
	}
	for (var rightI = 0; rightI < rightSplit.length; rightI++) {
		if (rightSplit[rightI].includes(`^`)) {
			var rightPowerSplit = rightSplit[rightI].split(`^`);
			if (rightPowerSplit[1][0] == `-`) err.push(`${rightSplit[rightI]} contains a negative power`);
			if (rightPowerSplit[1].includes(`/`)) err.push(`${rightSplit[rightI]} contains a fractional exponent`);
		}
	}
	if (err.length > 0) {
		for (let error in err) {
			console.log(err[error]);
		}
		process.exit(1);
	}
}

const consolidateEq = (leftEq, rightEq, fullEq) => {
	for (let lI in leftEq) fullEq.push(leftEq[lI]);
	for (let rI in rightEq) fullEq.push(rightEq[rI]);
}

const reducedForm = (polyEq) => {
	var leftPolyEq = polyEq.leftSide;
	var rightPolyEq = polyEq.rightSide;
	var symSplitLeftEq = [];
	var symSplitRightEq = [];
	splitSym(symSplitLeftEq, leftPolyEq);
	splitSym(symSplitRightEq, rightPolyEq);
	weirdPowers(symSplitLeftEq, symSplitRightEq);

	var conv;
	try {
		conv = parseFloat(rightPolyEq[0], 10);
		// console.log(conv);
	}
	catch (err) {
		console.log(`Conversion failed`);
	}

	if (rightPolyEq.length > 1 || conv !== 0) {
		swapSign(symSplitRightEq);
		// console.log(symSplitLeftEq);
		// console.log(symSplitRightEq);
	}

	var fullEq = [];
	consolidateEq(symSplitLeftEq, symSplitRightEq, fullEq);
	// console.log(fullEq);

	var disc = 0;
	var degrees = {
		zero : [],
		first : [],
		second : []
	};
	degree(degrees, fullEq, disc);
	// console.log(`Left split: ${symSplitLeftEq}`);
	// console.log(`Right split: ${symSplitRightEq}`);
	// console.log(`Disc val: ${disc}`);
	// console.log(`Zero degree: ${degrees.zero}`);
	// console.log(`First degree: ${degrees.first}`);
	// console.log(`Second degree: ${degrees.second}`);
}

const splitSym = (newSplit, oldSplit) => {
	var nIter = 0;
	newSplit[nIter] = oldSplit[nIter];
	for (var oIter = 1; oIter < oldSplit.length; oIter++) {
		if (oldSplit[oIter] == `+` || oldSplit[oIter] == `-`) {
			nIter++;
			newSplit[nIter] = oldSplit[oIter];
		}
		else {
			if (newSplit[nIter].includes(`/`)) {
				var divSplit = newSplit[nIter].split(`/`);
				if (parseFloat(divSplit[1]) === 0) {
					console.log(`${newSplit[nIter]} Division by zero is not allowed (undefined)`);
					process.exit(1);
				}
				newSplit[nIter] = (parseFloat(divSplit[0]) / parseFloat(divSplit[1]));
				newSplit[nIter].toString();
			}
			newSplit[nIter] = newSplit[nIter] + oldSplit[oIter];
		}
	}
}

const swapSign = (rightPolyEq) => {
	for (var i = 0; i < rightPolyEq.length; i++) {
		if (rightPolyEq[i][0] == `-`) rightPolyEq[i][0] = `+`;
		else if (rightPolyEq[i][0] == `+`) rightPolyEq[i][0] = `-`;
		else rightPolyEq[i] = `-` + rightPolyEq[i];
	}
}

const degree = (degrees, fullEq, disc) => {
	for (i in fullEq) {
		var degreeSplit = fullEq[i].split(`^`);
		var conv = parseFloat(degreeSplit[1]);
		if (conv === 0) degrees.zero.push(fullEq[i]);
		if (conv === 1) degrees.first.push(fullEq[i]);
		if (conv === 2) degrees.second.push(fullEq[i]);
		if (conv > disc) disc = conv;
	}
	if (degrees.zero.length === 0) degrees.zero.push(`0*X^0`);
	if (degrees.first.length === 0) degrees.zero.push(`0*X^1`);
	if (degrees.second.length === 0) degrees.zero.push(`0*X^2`);
	if (disc > 2) {
		console.log(`Degree is greater than 2 (${disc}), cannot solve`);
		process.exit(1);
	}
	else solveEq(degrees, disc);
}

const solveDegree = (degree, reducedForm) => {
	let final = 0;
	let numSplit = [];
	if (degree.length > 0) {
		for (i in degree) {
			numSplit = degree[i].split(`*`);
			final += parseFloat(numSplit[0]);
		}
		// console.log(final);
		reducedForm.push(`${final.toString()}*${numSplit[1]}`);
		// console.log(`am here ${reducedForm}`);
	}
}

const solveEq = (degrees, disc) => {
	let a = [];
	let b = [];
	let c = [];
	solveDegree(degrees.zero, c);
	solveDegree(degrees.first, b);
	solveDegree(degrees.second, a);
	let newB = b;
	let newC = c;
	rebuildEq(newB, newC, disc);
	if (disc == 2) console.log(`Reduced form: ${a} ${newB} ${newC} = 0`);
}

const rebuildEq = (b, c, disc) => {
	if (b[0][0] != `-`) b[0] = `+ ${b[0]}`;
	if (c[0][0] != `-`) c[0] = `+ ${c[0]}`;
}

const squareRoot = () => {

}

const main = (args) => {
	// console.log(args);
	argsHandler(args);
	// console.log(`sick spelling`);
	// console.log(2/0);
	// console.log(`welp`);
}

main(args);