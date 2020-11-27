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
		console.log(`bugger off`);
		process.exit(1);
	}
	else {
		polynomial(args);
		console.log(`still bugger off`);
		console.log(`${args[2]}\ndefo still bugger off`);
	}
}

const division = (num1, num2) => {
	if (num2 === 0) {
		console.log(`division by 0 is undefined`);
		process.exit(1);
	}
	return (num1/num2);
}

const polynomial = (expr) => {
	// always reduce equation first
	console.log(expr);
	var polySplit = expr[2].split(`=`);
	var polyKV = {
		leftSide : polySplit[0],
		rightSide : polySplit[1]
	};
	console.log(polyKV);
	var reducedForm;
	reducedForm = reducedForm();
	var polyDegree;
	var discriminant;
	console.log(`Reduced form: (whatever the fuck that is)`);
	console.log(`Polynomial degree: (can read if it's greater than 2, doesn't solve tho)`);
	console.log(`Sign of discriminant (whatever the fuck that is) if it exists and solution(s)`);
}

const reducedForm = () => {
	return(``);
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