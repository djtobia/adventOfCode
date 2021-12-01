import re
print('Python')
file = open('./input/day4.txt')
file = [x.strip() for x in file.readlines()]


def buildPassportsArray(stream):
    string = ''
    passports = []
    for line in stream:
        if (line != ''):
            string = f"{string} {line}"
        else:
            passports.append(string)
            string = ''
    return passports


passports = buildPassportsArray(file)
totalNeeded = 7
requiredFields = ['eyr', 'iyr', 'byr', 'hgt', 'hcl', 'ecl', 'pid']


def part1():
    validPassports = 0
    for passport in passports:
        fieldCount = 0
        for field in requiredFields:
            if (re.search(field, passport) is not None):
                fieldCount += 1

        if (fieldCount == totalNeeded):
            validPassports += 1
    print('Part 1 : {}'.format(validPassports))


def part2():
    validPassports = 0
    requiredWords = [
        r'\beyr:\d{4}\b', r'\biyr:\d{4}\b', r'\bbyr:\d{4}\b',
        r'\bhgt:(\d{2}|\d{3})(cm|in)\b', r'\bhcl:#([0-9a-f]{6})\b',
        r'\becl:[a-z]{3}\b', r'\bpid:\d{9}\b'
    ]

    for passport in passports:
        fieldCount = 0
        expYear = re.search(requiredWords[0], passport)
        if (expYear is not None):
            year = int(expYear.group().split(':')[1])
            if (year >= 2020 and year <= 2030):
                fieldCount += 1
        issueYear = re.search(requiredWords[1], passport)
        if (issueYear is not None):
            year = int(issueYear.group().split(':')[1])
            if (year >= 2010 and year <= 2020):
                fieldCount += 1
        birthYear = re.search(requiredWords[2], passport)
        if (birthYear is not None):
            year = int(birthYear.group().split(':')[1])
            if (year >= 1920 and year <= 2002):
                fieldCount += 1
        height = re.search(requiredWords[3], passport)
        if (height is not None):
            value = height.group().split(':')[1]
            if (re.search('cm', value) is not None):
                val = int(value.split('cm')[0])
                if (val >= 150 and val <= 193):
                    fieldCount += 1
            elif (re.search('in', value) is not None):
                val = int(value.split('in')[0])
                if (val >= 59 and val <= 76):
                    fieldCount += 1
        hair = re.search(requiredWords[4], passport)
        if (hair is not None):
            if (re.search("#[0-9a-f]{6}", hair.group()) is not None):
                fieldCount += 1
        eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
        eyeColor = re.search(requiredWords[5], passport)
        if (eyeColor is not None):
            val = eyeColor.group().split(':')[1]
            for color in eyeColors:
                if (re.search(color, val) is not None):
                    fieldCount += 1
                    break
        passportId = re.search(requiredWords[6], passport)
        if (passportId is not None):
            if (re.search(r"\d{9}", passportId.group()) is not None):
                fieldCount += 1
        if (fieldCount == totalNeeded):
            validPassports += 1
    print("Part 2 : {}".format(validPassports))


part1()
part2()