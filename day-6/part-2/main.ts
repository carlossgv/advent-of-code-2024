// @ts-ignore
import fs from "fs";

const FILE = fs.readFileSync("test-input.txt", "utf-8");
const WRITABLE_FILE = FILE.split("");
const LINE_LENGTH = FILE.indexOf("\n");
const PATHS: Path[] = [
  { dir: "right", x: 1, y: 0 }, // direction: right
  { dir: "down", x: 0, y: 1 }, // direction: down
  { dir: "left", x: -1, y: 0 }, // direction: left
  { dir: "up", x: 0, y: -1 }, // direction: up
];
type Path = { dir: string; x: number; y: number };
type Data = { index: number; path: Path };
type Coordinates = { x: number; y: number };
let COUNT = 0;

const CLOCKWISE: {
  [key: string]: string;
} = {
  right: "down",
  down: "left",
  left: "up",
  up: "right",
};

const MOVE = (index: number, dir: Path): number => {
  return (index += dir.x + dir.y * (LINE_LENGTH + 1));
};

const moveToNextBarrier = (
  index: number,
  path: Path,
): { index: number; path: Path } => {
  while (WRITABLE_FILE[index] !== "#") {
    index = MOVE(index, path);
  }
  const newDir = CLOCKWISE[path.dir];
  const newPath = PATHS.find((p) => p.dir === newDir);
  if (!newPath) {
    throw new Error("Path not found");
  }
  return { index, path: newPath };
};

const checkCircuit = (
  index: number,
  path: { dir: string; x: number; y: number },
) => {
  const initialIndex = index;
  const firstCollision = moveToNextBarrier(index, path);

  let secondCollision = moveToNextBarrier(
    firstCollision.index,
    firstCollision.path,
  );
  let thirdCollision = moveToNextBarrier(
    secondCollision.index,
    secondCollision.path,
  );
};

const checkIfCanReach = (data: Data, finalIndex: number) => {
  const { index, path } = data;
  const finalCoordinates = transformIndexToCoordinates(finalIndex);
  const initialCoordinates = transformIndexToCoordinates(index);


  // let newIndex = index;
  //
  // while (newIndex !== finalIndex) {
  //   newIndex = MOVE(newIndex, path);
  //   if (WRITABLE_FILE[newIndex] === "#") {
  //     return false;
  //   }
  // }
  // return true;
};

const transformIndexToCoordinates = (index: number): Coordinates => {
  const x = index % (LINE_LENGTH + 1);
  const y = Math.floor(index / (LINE_LENGTH + 1));
  return { x, y };
};

const canCloseCircuit = (
  initialIndex: Data,
  firstCollision: Data,
  thirdCollision: Data,
) => {
  if (thirdCollision.path.dir === "up") {
    const initialCoordinates = transformIndexToCoordinates(initialIndex.index);
    const firstCoordinates = transformIndexToCoordinates(firstCollision.index);
    const thirdCoordinates = transformIndexToCoordinates(thirdCollision.index);

    if (
      thirdCoordinates.x >= initialCoordinates.x &&
      thirdCoordinates.x <= firstCoordinates.x
    ) {
    }
  }
};

const main = () => {
  for (let i = 0; i < WRITABLE_FILE.length; i++) {
    if (WRITABLE_FILE[i] === "^") {
      checkCircuit(i, PATHS[3]);
    }
  }

  console.log("COUNT: ", COUNT);
};

main();
