const [operator, ...arguments] = process.argv.slice(2);
const numbers = arguments.map((item) => Number(item));

module.exports = { operator, numbers };
