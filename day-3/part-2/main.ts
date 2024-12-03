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

const checkIfActive = (index: number, file: string): boolean | null => {
  const initialIndex = index;

  const active = isActive(index, file);
  if (active) {
    return true;
  }

  index = initialIndex;

  const inactive = isInactive(index, file);
  if (inactive) {
    return false;
  }

  return null;
};

const isInactive = (index: number, file: string): boolean => {
  const inactiveRules = ["d", "o", "n", "'", "t", "(", ")"];
  for (let i = 0; i < inactiveRules.length; i++) {
    if (inactiveRules[i] !== file[index]) {
      return false;
    }
    index++;
  }
  return true;
};

const isActive = (index: number, file: string): boolean => {
  const activeRules = ["d", "o", "(", ")"];
  for (let i = 0; i < activeRules.length; i++) {
    if (activeRules[i] !== file[index]) {
      return false;
    }
    index++;
  }
  return true;
};

const main = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  let response = 0;
  let active = true;

  for (let i = 0; i < file.length; i++) {
    const char = file[i];
    const index = i;
    if (char === "d") {
      const isActive = checkIfActive(index, file);
      if (isActive !== null) {
        active = isActive;
      }
    }
    if (char === "m") {
      const value = checkIfValidMulAndReturnMul(index, file);
      if (value && active) {
        response += value;
      }
    }
  }

  console.log("RESULT: ", response);
};

main();
