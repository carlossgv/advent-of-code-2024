// @ts-ignore
import fs from "fs";

const FILE = fs.readFileSync("input.txt", "utf-8");
const WRITABLE_FILE = FILE.split("");
const LINE_LENGTH = FILE.indexOf("\n");
const PATHS: { dir: string; x: number; y: number }[] = [
  { dir: "right", x: 1, y: 0 }, // direction: right
  { dir: "down", x: 0, y: 1 }, // direction: down
  { dir: "left", x: -1, y: 0 }, // direction: left
  { dir: "up", x: 0, y: -1 }, // direction: up
];
let COUNT = 0;

const CLOCKWISE: {
  [key: string]: string;
} = {
  right: "down",
  down: "left",
  left: "up",
  up: "right",
};

const MOVE = (index: number, dir: { x: number; y: number }): number => {
  return (index += dir.x + dir.y * (LINE_LENGTH + 1));
};

const walk = (index: number, path: { dir: string; x: number; y: number }) => {
  while (true) {
    const nextIndex = MOVE(index, path);
    if (!WRITABLE_FILE[nextIndex] || WRITABLE_FILE[nextIndex] === "\n") {
      COUNT++;
      break;
    }

    if (WRITABLE_FILE[nextIndex] === "#") {
      // turn
      // console.debug("TURNING");
      // console.debug("path.dir: ", path.dir);
      const newDir = CLOCKWISE[path.dir];
      const newPath = PATHS.find((p) => p.dir === newDir);
      if (!newPath) throw new Error("Path not found");
      path = newPath;
      // console.debug("path.dir: ", path.dir);
    }

    if (WRITABLE_FILE[index] === ".") {
      // count and move
      COUNT++;
      WRITABLE_FILE[index] = "X";
    }

    // console.debug("index before: ", index);
    index = MOVE(index, path);
    // console.debug("index after: ", index);
    // printFile(index);
    // console.debug(WRITABLE_FILE);
    // console.debug("COUNT: ", COUNT);
  }
};

const main = () => {
  for (let i = 0; i < WRITABLE_FILE.length; i++) {
    if (WRITABLE_FILE[i] === "^") {
      console.debug("beggining i: ", i);
      WRITABLE_FILE[i] = "X";
      COUNT++;
      walk(i, PATHS[3]);
    }
  }

  console.log("COUNT: ", COUNT);
};

main();
