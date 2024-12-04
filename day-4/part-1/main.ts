// @ts-ignore
import fs from "fs";

const RULES = ["X", "M", "A", "S"];
const FILE = fs.readFileSync("input.txt", "utf-8");
const LINE_LENGTH = FILE.indexOf("\n");
const PATHS = [
  { x: 1, y: 0 }, // direction: right
  { x: 0, y: 1 }, // direction: down
  { x: -1, y: 0 }, // direction: left
  { x: 0, y: -1 }, // direction: up
  { x: 1, y: 1 }, // direction: diagRightDown
  { x: -1, y: 1 }, // direction: diagLeftDown
  { x: 1, y: -1 }, // direction: diagRightUp
  { x: -1, y: -1 }, // direction: diagLeftUp
];

const checkSurroundXmas = (index: number): number => {
  let count = 0;
  for (const path of PATHS) {
    if (checkInlineXmas(index, path)) {
      count++;
    }
  }

  return count;
};

const checkInlineXmas = (
  index: number,
  dir: { x: number; y: number },
): boolean => {
  for (const rule of RULES) {
    if (FILE[index] !== rule) {
      return false;
    }
    index += dir.x + dir.y * (LINE_LENGTH + 1);
  }

  return true;
};

const main = () => {
  let count = 0;

  for (let i = 0; i < FILE.length; i++) {
    if (FILE[i] === "\n") {
      continue;
    }

    if (FILE[i] === "X") {
      count += checkSurroundXmas(i);
    }
  }

  console.log("COUNT: ", count);
};

main();
