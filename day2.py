import re
print('Python')
file = open('./input/day2.txt')
file = [x.strip() for x in file.readlines()]


def part1():
    correct = 0
    for record in file:
        splitLine = record.split(" ")
        minMax = splitLine[0].split("-")
        # print(splitLine)
        char = splitLine[1][0]
        occurences = len(re.findall(char, splitLine[2]))
        if (occurences <= int(minMax[1]) and occurences >= int(minMax[0])):
            correct += 1
    print('Part 1 : {}'.format(correct))


def part2():
    correct = 0
    for record in file:
        splitLine = record.split(" ")
        locations = list(map(int, splitLine[0].split("-")))
        char = splitLine[1][0]
        if ((splitLine[2][locations[0] - 1] == char
             and splitLine[2][locations[1] - 1] != char)
                or (splitLine[2][locations[0] - 1] != char
                    and splitLine[2][locations[1] - 1] == char)):
            correct += 1
    print('Part 2 : {}'.format(correct))


part1()
part2()