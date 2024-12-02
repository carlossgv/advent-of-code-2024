import fs from "fs";

const parseLists = (
  filePath: string,
): {
  firstList: number[];
  secondList: number[];
} => {
  const file = fs.readFileSync(filePath, "utf-8");
  const firstList = [];
  const secondList = [];

  for (const line of file.split("\n")) {
    if (line === "") {
      continue;
    }

    const left = line.split("   ")[0];
    const right = line.split("   ")[1];

    firstList.push(parseInt(left));
    secondList.push(parseInt(right));
  }

  return { firstList, secondList };
};

const calculateDistances = (
  firstList: number[],
  secondList: number[],
): number => {
  const orderedFirstList = firstList.sort((a, b) => a - b);
  const orderedSecondList = secondList.sort((a, b) => a - b);
  let value = 0;

  for (let i = 0; i < orderedFirstList.length; i++) {
    console.debug("number in first list:", orderedFirstList[i]);
    console.debug("number in second list:", orderedSecondList[i]);
    console.debug(
      "difference:",
      Math.abs(orderedFirstList[i] - orderedSecondList[i]),
    );
    value += Math.abs(orderedFirstList[i] - orderedSecondList[i]);
  }

  return value;
};

const { firstList, secondList } = parseLists("test-input.txt");
const result = calculateDistances(firstList, secondList);
console.log(result);
