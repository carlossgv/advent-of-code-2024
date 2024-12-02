// @ts-ignore
import fs from "fs";

const parseLists = (
  filePath: string,
): {
  firstList: number[];
  secondList: number[];
} => {
  const file = fs.readFileSync(filePath, "utf-8");
  const firstList: number[] = [];
  const secondList: number[] = [];

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

const secondListMapper = (
  list: number[],
): {
  [key: number]: number;
} => {
  return list.reduce((acc, curr) => {
    let amounts = 0;
    list.forEach((number) => {
      if (number === curr) {
        amounts++;
      }
    });

    return {
      ...acc,
      [curr]: amounts,
    };
  }, {});
};

const main = () => {
  const { firstList, secondList } = parseLists("input.txt");

  const secondListMapped = secondListMapper(secondList);

  let similarity = 0;

  firstList.forEach((number) => {
    if (secondListMapped[number] > 0) {
      similarity = similarity + number * secondListMapped[number];
    }
  });

  console.log(similarity);
};

main();
