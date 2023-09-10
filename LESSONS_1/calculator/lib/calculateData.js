const calculateData = () => {
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

module.exports = calculateData;
