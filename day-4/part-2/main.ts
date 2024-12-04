// @ts-ignore
import fs from "fs";

const RULES = ["M", "A", "S"];
const FILE = fs.readFileSync("input.txt", "utf-8");
const LINE_LENGTH = FILE.indexOf("\n");
const PATHS = [
  { x: 1, y: 1, init: { x: -1, y: -1 } }, // direction: diagRightDown
  { x: -1, y: 1, init: { x: 1, y: -1 } }, // direction: diagLeftDown
  { x: 1, y: -1, init: { x: -1, y: 1 } }, // direction: diagRightUp
  { x: -1, y: -1, init: { x: 1, y: 1 } }, // direction: diagLeftUp
];

const isXmas = (index: number): boolean => {
  let count = 0;
  for (const path of PATHS) {
    if (checkInlineXmas(index, path, path.init)) {
      count++;
    }
  }

  return count === 2;
};

const checkInlineXmas = (
  index: number,
  dir: { x: number; y: number },
  init: { x: number; y: number },
): boolean => {
  index += init.x + init.y * (LINE_LENGTH + 1);

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

    if (FILE[i] === "A") {
      if (isXmas(i)) {
        count++;
      }
    }
  }

  console.log("COUNT: ", count);
};

main();
