// node calc.js sum 5 10 15
// node calc.js sub 30 10 15
// node calc.js mult 5 10 4
// node calc.js div 40 5 4

const [operator, ...arguments] = process.argv.slice(2);
const numbers = arguments.map((item) => Number(item));

const calculation = () => {
  switch (operator) {
    case "sum":
      return numbers.reduce((acc, item) => acc + item);
    case "sub":
      return numbers.reduce((acc, item) => acc - item);
    case "mult":
      return numbers.reduce((acc, item) => acc * item);
    case "div":
      return numbers.reduce((acc, item) => acc / item);
    default:
      return "Unknown operation type";
  }
};

const result = calculation(operator, numbers);
console.log(result);
