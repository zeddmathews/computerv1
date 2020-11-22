const args = process.argv;
var expr;

function argsHandler(args) {
	if (args.length < 3) {
		console.log(`bugger off`);
		process.exit(1);
	}
	else {
		polynomial();
		console.log(`still bugger off`);
		console.log(`${args[2]}\ndefo still bugger off`);
	}
}

function division(num1, num2) {
	if (num2 === 0) {
		console.log(`division by 0 is undefined`);
		process.exit(1);
	}
	return (num1/num2);
}

function polynomial(expr) {
	var reducedForm;
	var polyDegree;
	var discriminant;
	console.log(`Reduced form: (whatever the fuck that is)`);
	console.log(`Polynomial degree: (can read if it's greater than 2, doesn't solve tho)`);
	console.log(`Sign of discriminant (whatever the fuck that is) if it exists and solution(s)`);
}

function main(args) {
	argsHandler(args);
	console.log(2/0);
	console.log(`welp`);
}

main(args);