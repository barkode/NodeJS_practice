const calculator = require("../Calculator");
const [operator, ...arguments] = process.argv.slice(2);
const numbers = arguments.map((item) => Number(item));
console.log(calculator);
