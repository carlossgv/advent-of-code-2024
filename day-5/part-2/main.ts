// @ts-ignore
import fs from "fs";

const FILE = fs.readFileSync("input.txt", "utf-8");
const RULES: Rule[] = [];
type Rule = { before: number; after: number };
const UPDATES: number[][] = [];
let RESPONSE = 0;

const checkIfUpdateIsValid = (
  update: number[],
): { update: number[]; fixed: boolean } => {
  let fixed = false;
  for (let i = 0; i < update.length; i++) {
    const currentPage = update[i];
    const rules = getAllApplicableRules(currentPage);

    for (const rule of rules) {
      const { valid, index } = checkIfPageIsValid(i, update, rule);
      if (!valid && index !== undefined) {
        const tmp = update[i];
        update[i] = update[index];
        update[index] = tmp;
        fixed = true;
        checkIfUpdateIsValid(update);
      }
    }
  }

  return { update, fixed };
};

const checkIfPageIsValid = (
  currentIndex: number,
  update: number[],
  rule: Rule,
): { valid: boolean; index?: number } => {
  for (let i = 0; i < currentIndex; i++) {
    if (update[i] === rule.after) {
      return { valid: false, index: i };
    }
  }
  return { valid: true };
};

const getAllApplicableRules = (currentPage: number): Rule[] => {
  const rules: Rule[] = [];
  for (const rule of RULES) {
    if (rule.before === currentPage) {
      rules.push(rule);
    }
  }

  return rules;
};

const main = () => {
  parseInput();
  let amountOfUpdates = 0;

  for (const update of UPDATES) {
    const response = checkIfUpdateIsValid(update);
    if (response.fixed) {
      const middleValue =
        response.update[Math.floor(response.update.length / 2)];
      RESPONSE += middleValue;
    }
    amountOfUpdates++;
    console.log("UPDATE: ", amountOfUpdates);

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
