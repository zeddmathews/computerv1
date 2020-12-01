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

const division = (num1, num2) => {
	if (num2 === 0) {
		console.log(`division by 0 is undefined`);
		process.exit(1);
	}
	return (num1/num2);
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

const polynomial = (expr) => {
	// always reduce equation first
	var polySplit = expr[2].split(`=`);
	var polyKV = {
		leftSide : polySplit[0].trim().split(` `),
		rightSide : polySplit[1].trim().split(` `)
	};
	console.log(polyKV);
	var reducedEq = reducedForm(polyKV);
	var polyDegree;
	var discriminant;
	console.log(`Reduced form: (whatever the fuck that is)`);
	console.log(`Polynomial degree: (can read if it's greater than 2, doesn't solve tho)`);
	console.log(`Sign of discriminant (whatever the fuck that is) if it exists and solution(s)`);
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
		conv = parseInt(rightPolyEq[0], 10);
		console.log(conv);
	}
	catch (err) {
		console.log(`Conversion failed`);
	}
	if (rightPolyEq.length > 1 || conv !== 0) {
		swapSign(symSplitRightEq);
		console.log(symSplitLeftEq);
		console.log(symSplitRightEq);
		console.log(`reduction time`);
	}
	console.log(`Left split: ${symSplitLeftEq}`);
	console.log(`Right split: ${symSplitRightEq}`);
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
				if (parseInt(divSplit[1]) === 0) {
					console.log(`${newSplit[nIter]} Division by zero is not allowed`);
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
		if (rightPolyEq[i][0] == `-`) {
			rightPolyEq[i][0] = `+`;
		}
		else if (rightPolyEq[i][0] == `+`) {
			rightPolyEq[i][0] = `-`;
		}
		else {
			rightPolyEq[i] = `-` + rightPolyEq[i];
		}
	}
}

const degree = () => {

}

const squareRoot = () => {

}

const main = (args) => {
	// console.log(args);
	argsHandler(args);
	console.log(`sick spelling`);
	console.log(2/0);
	console.log(`welp`);
}

main(args);