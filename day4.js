import { readInput } from "./helper.js";

const input = readInput("./input/day4.txt", /^(\r\n)/gm);

const requiredFieldsRegexPart1 = [
  /eyr/g,
  /iyr/g,
  /byr/g,
  /hgt/g,
  /hcl/g,
  /ecl/g,
  /pid/g,
];
const totalNeeded = 7;

//part 1
let validPassports = 0;
input.forEach((passport) => {
  let fieldCount = 0;
  requiredFieldsRegexPart1.forEach((regex) => {
    if (passport.match(regex)) {
      fieldCount++;
    }
  });
  if (fieldCount === totalNeeded) {
    validPassports++;
  }
});

console.log("Part 1: ", validPassports);
validPassports = 0;

//part 2
//match returns value, so you can split the value and do the number checks
const requiredFieldsRegexPart2 = [
  /\beyr:\d{4}\b/g,
  /\biyr:\d{4}\b/g,
  /\bbyr:\d{4}\b/g,
  /\bhgt:(\d{2}|\d{3})(cm|in)\b/g,
  /\bhcl:#([0-9a-f]{6})\b/g,
  /\becl:[a-z]{3}\b/g,
  /\bpid:\d{9}\b/g,
];
input.forEach((passport) => {
  let fieldCount = 0;
  let expYear = passport.match(requiredFieldsRegexPart2[0]);
  if (expYear) {
    expYear = expYear.map((val) => {
      val = parseInt(val.split(":")[1]);
      return val >= 2020 && val <= 2030;
    })[0];
    if (expYear) fieldCount++;
  }

  let issueYear = passport.match(requiredFieldsRegexPart2[1]);
  if (issueYear) {
    issueYear = issueYear.map((val) => {
      val = parseInt(val.split(":")[1]);
      return val >= 2010 && val <= 2020;
    })[0];
    if (issueYear) fieldCount++;
  }

  let birthYear = passport.match(requiredFieldsRegexPart2[2]);
  if (birthYear) {
    birthYear = birthYear.map((val) => {
      val = parseInt(val.split(":")[1]);
      return val >= 1920 && val <= 2002;
    })[0];
    if (birthYear) fieldCount++;
  }

  let height = passport.match(requiredFieldsRegexPart2[3]);
  if (height) {
    height = height.map((val) => {
      val = val.split(":")[1];
      if (val.match("cm")) {
        val = parseInt(val.split("cm")[0]);
        return val >= 150 && val <= 193;
      } else if (val.match("in")) {
        val = parseInt(val.split("in")[0]);
        return val >= 59 && val <= 76;
      }
      return false;
    })[0];
    if (height) fieldCount++;
  }

  let hair = passport.match(requiredFieldsRegexPart2[4]);
  if (hair) {
    hair = hair.map((val) => {
      return val.match(/#[0-9a-f]{6}/g) ? true : false;
    })[0];
    if (hair) {
      fieldCount++;
    }
  }

  const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  let eyeColor = passport.match(requiredFieldsRegexPart2[5]);
  if (eyeColor) {
    eyeColor = eyeColor.map((val) => {
      val = val.split(":")[1];
      let match = false;
      for (let i = 0; i < eyeColors.length; i++) {
        if (val.match(eyeColors[i])) {
          match = true;
          break;
        }
      }
      return match;
    })[0];
    if (eyeColor) fieldCount++;
  }

  let passportId = passport.match(requiredFieldsRegexPart2[6]);
  if (passportId) {
    passportId = passportId.map((val) => {
      return val.match(/\d{9}/) ? true : false;
    })[0];
    if (passportId) {
      fieldCount++;
    }
  }
  if (fieldCount === totalNeeded) {
    validPassports++;
  }
});

console.log("Part 2: ", validPassports);
