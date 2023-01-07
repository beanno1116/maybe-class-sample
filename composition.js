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
    // f = plus3(val)
    // g = plus2(val)
    // x is the value passed in to the compose(val) call, in this example 10
    // g, aka plus2(val) gets called first with the parameter passed = 10
    // g adds val, which is 10, and 2 and returns the result, 12
    // g returns 12 which is piped in to the input of f, which is plus3(val)
    // f adds val, which is 12, and 3 and returns the result, 13
    // f returns 15 which is then returned from the compose function
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
