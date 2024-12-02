// @ts-ignore
import fs from "fs";

// clear log file
fs.writeFileSync("log.txt", "");

// Utility function to write debug messages to a log file
const logDebug = (...args: any[]) => {
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(" ");
  fs.appendFileSync("log.txt", `${message}\n`);
  console.debug(...args); // Optionally keep this for console output
};

const isReportSafe = (report: number[], firstFail: boolean = true): boolean => {
  const isIncreasing = Boolean(report[1] > report[0]);

  for (let i = 0; i < report.length - 1; i++) {
    let safeLevel = compareLevels(report[i], report[i + 1], isIncreasing);

    if (!safeLevel && firstFail) {
      for (let j = 0; j < report.length; j++) {
        const strippedReport = report.filter((_, index) => index !== j);
        const strippedSafeLevel = isReportSafe(strippedReport, false);
        if (strippedSafeLevel) {
          safeLevel = true;
          break;
        }
      }
    }

    if (!safeLevel) {
      logDebug("not safe level: ", report[i], report[i + 1]);
      return false;
    }
  }

  !firstFail && logDebug("report safe after cleaning: ", report);
  firstFail && logDebug("report safe: ", report);

  return true;
};

const compareLevels = (
  current: number,
  next: number,
  increasing: boolean,
): boolean => {
  if (increasing && current > next) {
    return false;
  }

  if (!increasing && current < next) {
    return false;
  }

  if (Math.abs(current - next) > 3 || Math.abs(current - next) === 0) {
    return false;
  }

  return true;
};

const main = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  let safeReports = 0;
  let reportsChecked = 0;

  for (const line of file.split("\n")) {
    if (line === "") {
      continue;
    }

    const report = line.split(" ").map((number: string) => parseInt(number));

    reportsChecked++;

    isReportSafe(report) && safeReports++;

    logDebug("\n");
  }

  console.log("reports checked: ", reportsChecked);
  console.log("safe reports: ", safeReports);
};

main();
