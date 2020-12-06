const args = process.argv;

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
	var polySplit = expr[2].split(`=`);
	var polyKV = {
		leftSide : polySplit[0].trim().split(` `),
		rightSide : polySplit[1].trim().split(` `)
	};
	reducedForm(polyKV);
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
	var symSplitLeftEq = [];
	var symSplitRightEq = [];
	// console.log(polyEq.rightSide);
	splitSym(symSplitLeftEq, polyEq.leftSide);
	splitSym(symSplitRightEq, polyEq.rightSide);
	// weirdPowers(symSplitLeftEq, symSplitRightEq);

	var conv;
	try {
		conv = parseFloat(polyEq.rightSide[0], 10);
	}
	catch (err) {
		console.log(`Conversion failed`);
	}

	if (polyEq.rightSide.length > 1 || conv !== 0) {
		swapSign(symSplitRightEq);
	}

	// console.log(symSplitLeftEq);
	// console.log(symSplitRightEq);
	var fullEq = [];
	consolidateEq(symSplitLeftEq, symSplitRightEq, fullEq);
	// console.log(fullEq);
	var power = 0;
	var degrees = {
		zero : [],
		first : [],
		second : []
	};
	degree(degrees, fullEq, power);
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
			if (newSplit[nIter].includes(`/`)) console.log(`nani`);
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
		// console.log(rightPolyEq[i][0]);
		if (rightPolyEq[i][0] == `-`) {
			rightPolyEq[i] = rightPolyEq[i].split(``);
			rightPolyEq[i][0] = `+`;
			rightPolyEq[i] = rightPolyEq[i].join(``);
		}
		else if (rightPolyEq[i][0] == `+`) {
			rightPolyEq[i] = rightPolyEq[i].split(``);
			rightPolyEq[i][0] = `-`;
			rightPolyEq[i] = rightPolyEq[i].join(``);
		}
		else rightPolyEq[i] = `-` + rightPolyEq[i];
	}
}

const degree = (degrees, fullEq, power) => {
	for (i in fullEq) {
		var degreeSplit = fullEq[i].split(`^`);
		var conv = parseFloat(degreeSplit[1]);
		if (conv === 0) degrees.zero.push(fullEq[i]);
		if (conv === 1) degrees.first.push(fullEq[i]);
		if (conv === 2) degrees.second.push(fullEq[i]);
		if (conv > power) power = conv;
	}
	// console.log(degrees);
	if (degrees.zero.length === 0) degrees.zero.push(`0*X^0`);
	if (degrees.first.length === 0) degrees.first.push(`0*X^1`);
	if (degrees.second.length === 0) degrees.second.push(`0*X^2`);
	solveEq(degrees, power);
}

const solveDegree = (degree, reducedForm) => {
	let final = 0;
	let numSplit = [];
	if (degree.length > 0) {
		for (i in degree) {
			numSplit = degree[i].split(`*`);
			final += parseFloat(numSplit[0]);
		}
		reducedForm.push(`${final.toString()}`);
		reducedForm.push(`*${numSplit[1]}`);
	}
}

const rebuildEq = (b, c) => {
	if (b[0][0] != `-`) b[0] = `+ ${b[0]}`;
	if (c[0][0] != `-`) c[0] = `+ ${c[0]}`;
}

const solveDisc = (a, b, c, power) => {
	const discriminant = (b * b) -(4 * (a * c));
	const negQuadraticFormula = ((-b - squareRoot(discriminant)) / (2 * a));
	const posQuadraticFormula = ((-b + squareRoot(discriminant)) / (2 * a));
	if (power === 0) {
		if (discriminant === 0) {
			console.log(`This equation accepts all real numbers as solution`);
			process.exit(1);
		}
		else {
			console.log(`This equation has no solution`);
			process.exit(1);
		}
	}
	if (power === 2) {
		if (discriminant > 0) console.log(`Discriminant is strictly positive, the two solutions are:\n${negQuadraticFormula}\n${posQuadraticFormula}`);
		else if (discriminant < 0) console.log(`Discriminant is strictly negative, the two solutions are:\n${negQuadraticFormula}\n${posQuadraticFormula}`);
		else {
			console.log(`Discriminant is zero the solution is:\n${negQuadraticFormula}`);
			process.exit(1);
		}
	}
	else if (power === 1) console.log(`The solution is:\n${-c/b}`);
}

const solveEq = (degrees, power) => {
	let a = [];
	let b = [];
	let c = [];
	solveDegree(degrees.zero, c);
	solveDegree(degrees.first, b);
	solveDegree(degrees.second, a);
	let newB = JSON.parse(JSON.stringify(b));
	let newC = JSON.parse(JSON.stringify(c));
	rebuildEq(newB, newC);
	if (power == 2) console.log(`Reduced form: ${a[0]}${a[1]} ${newB[0]}${newB[1]} ${newC[0]}${newC[1]} = 0`);
	else if (power == 1) console.log(`Reduced form: ${b[0]}${b[1]} ${newC[0]}${newC[1]} = 0`);
	console.log(`Polynomial degree: ${power}`);
	if (power > 2) {
		console.log(`Degree is greater than 2 (${power}), cannot solve`);
		process.exit(1);
	}
	solveDisc(a[0], b[0], c[0], power);
}

const squareRoot = (num) => {
	num = parseFloat(num);
	let s = num;
	while ((s - num/s) > 0.000001) {
		s = (s + num / s) / 2;
	}
	return (s);
}

const main = (args) => {
	argsHandler(args);
}

main(args);