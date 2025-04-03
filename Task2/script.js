const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == "clear") {
          display.innerText = "";
        } 
        else if (item.id == "backspace") {
            display.innerText = display.innerText.slice(0, -1);
          } 
        else if (display.innerText !== "" && item.id == "equal") {
          try {
            // display.innerText = evaluateExpression(display.innerText);
            display.innerText = eval(display.innerText);
        } catch {
          display.innerText = "Error";
          setTimeout(() => (display.innerText = ""), 2000);
        }
        } 
        else if (display.innerText === "" && item.id == "equal") {
          display.innerText = "Empty";
          setTimeout(() => (display.innerText = ""), 2000);
        } 
        else {
          display.innerText += item.id;
        }
    };
});



function evaluateExpression(expression) {
  let postfix = infixToPostfix(expression);
  let val =  evaluatePostfix(postfix);
  return isNaN(val) ? "Error" : val;
}

function infixToPostfix(expression) {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  let output = [];
  let operators = [];
  let number = "";
  
  for (let i = 0; i < expression.length; i++) {
    let ch = expression[i];
    
    if (!isNaN(ch)) {
      number += ch; 
    } else {
      if (number) {
        output.push(number);
        number = "";
      }
      
      if (ch === '(') {
        operators.push(ch);
      } else if (ch === ')') {
        while (operators.length && operators[operators.length - 1] !== '(') {
          output.push(operators.pop());
        }
        operators.pop();
      } else if ('+-*/'.includes(ch)) {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[ch]
        ) {
          output.push(operators.pop());
        }
        operators.push(ch);
      }
    }
  }
  if (number) output.push(number);
  while (operators.length) output.push(operators.pop());
  
  return output;
}

function evaluatePostfix(postfix) {
  let stack = [];
  
  postfix.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      let b = stack.pop();
      let a = stack.pop();
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  });
  
  return stack[0];
}
