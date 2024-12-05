// @ts-ignore
import fs from "fs";

const FILE = fs.readFileSync("input.txt", "utf-8");
const RULES: Rule[] = [];
type Rule = { before: number; after: number };
const UPDATES: number[][] = [];
let RESPONSE = 0;

const checkIfUpdateIsValid = (update: number[]): boolean => {
  for (let i = 0; i < update.length; i++) {
    const currentPage = update[i];
    console.debug("Current page: ", currentPage);
    const rules = getAllAppliableRules(currentPage);

    for (const rule of rules) {
      if (!checkIfPageIsValid(i, update, rule)) {
        console.debug("FAIL!: ", update);
        console.debug("Rule: ", rule);
        return false;
      }
    }
  }

  console.debug("PASS!: ", update);
  return true;
};

const checkIfPageIsValid = (
  currentIndex: number,
  update: number[],
  rule: Rule,
): boolean => {
  console.debug("rule: ", rule);
  for (let i = 0; i < currentIndex; i++) {
    if (update[i] === rule.after) {
      return false;
    }
  }
  return true;
};

const getAllAppliableRules = (currentPage: number): Rule[] => {
  const rules: Rule[] = [];
  for (const rule of RULES) {
    if (rule.before === currentPage) {
      rules.push(rule);
    }
  }

  return rules;
};

const getAfterPage = (currentPage: number): number => {
  for (const rule of RULES) {
    if (rule.before === currentPage) {
      return rule.after;
    }
  }

  return -1;
};

const main = () => {
  parseInput();

  for (const update of UPDATES) {
    if (checkIfUpdateIsValid(update)) {
      console.log("Valid update: ", update);
      const middleValue = update[Math.floor(update.length / 2)];
      console.log("Middle value: ", middleValue);
      RESPONSE += middleValue;
    }
  }

  console.log("RESPONSE: ", RESPONSE);
};

const parseInput = () => {
  let isRulesInput = true;
  const lines = FILE.split("\n");
  for (const line of lines) {
    if (line === "") {
      isRulesInput = false;
      continue;
    }

    if (isRulesInput) {
      RULES.push({
        before: parseInt(line.split("|")[0]),
        after: parseInt(line.split("|")[1]),
      });
    } else {
      UPDATES.push(line.split(",").map((num: string) => parseInt(num)));
    }
  }
};

main();
