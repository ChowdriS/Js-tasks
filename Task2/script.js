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