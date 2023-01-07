// FUNCTION COMPOSITION EXAMPLE https://medium.com/@tzehsiang/javascript-functor-applicative-monads-in-pictures-b567c6415221

const plus2 = function (val) {
  debugger;
  return val + 2;
}

const plus3 = function (val) {
  debugger;
  return val + 3;
}

const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  }
}


console.log("\r\n");
console.log("EXAMPLE OF FUNCTION COMPOSITION");
console.log("Composing plus3() and plus2() on the value 10.....");
let composedResult = compose(plus3, plus2)(10);
console.log(`Composed....`);
console.log(`Final value: ${composedResult}`);
debugger;
