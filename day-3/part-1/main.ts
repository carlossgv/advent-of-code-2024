// @ts-ignore
import fs from "fs";

const isNumber = (char: string) => {
  return !isNaN(parseInt(char));
};

const checkIfValidMulAndReturnMul = (index: number, file: string) => {
  const rules = ["m", "u", "l", "(", isNumber, ",", isNumber, ")"];
  let firstNumber = 0;
  let secondNumber = 0;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (typeof rule === "function") {
      const number = getAllNumbers(index, file);
      if (i === 4) {
        firstNumber = number;
      } else if (i === 6) {
        secondNumber = number;
      }
      index += number.toString().length;
      const isValid = rule(number.toString());
      if (!isValid) {
        return false;
      }
    } else {
      if (rule !== file[index]) {
        index++;
        return false;
      }
      index++;
    }
  }

  return firstNumber * secondNumber;
};

const getAllNumbers = (index: number, file: string): number => {
  const numbers: string[] = [];
  while (isNumber(file[index])) {
    numbers.push(file[index]);
    index++;
  }

  return parseInt(numbers.join(""));
};

const main = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  let response = 0;

  for (let i = 0; i < file.length; i++) {
    const char = file[i];
    const index = i;
    if (char === "m") {
      const value = checkIfValidMulAndReturnMul(index, file);
      if (value) {
        response += value;
      }
    }
  }

  console.log("RESULT: ", response);
};

main();
