// @ts-ignore
import fs from "fs";

const isReportSafe = (report: number[]): boolean => {
  const isIncreasing = Boolean(report[1] > report[0]);

  for (let i = 1; i < report.length; i++) {
    if (isIncreasing && report[i] < report[i - 1]) {
      return false;
    }

    if (!isIncreasing && report[i] > report[i - 1]) {
      return false;
    }

    if (
      Math.abs(report[i] - report[i - 1]) > 3 ||
      Math.abs(report[i] - report[i - 1]) === 0
    ) {
      return false;
    }
  }

  return true;
};

const main = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  let safeReports = 0;

  for (const line of file.split("\n")) {
    if (line === "") {
      continue;
    }

    const report = line.split(" ").map((number: string) => parseInt(number));

    isReportSafe(report) && safeReports++;
  }

  console.log(safeReports);
};

main();
