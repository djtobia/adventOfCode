from math import floor, ceil
print('Python')
file = open('./input/day5.txt')
file = [x.strip() for x in file.readlines()]

allSeatIds = []


def part1():
    highestSeatId = 0
    for i in range(len(file)):
        lowRow = 0
        highRow = 127
        lowCol = 0
        highCol = 7
        for char in file[i]:
            if char == 'F':
                if (highRow - lowRow == 1):
                    highRow = lowRow
                else:
                    highRow -= floor((highRow - lowRow) / 2) + 1
            elif char == 'L':
                if (highCol - lowCol == 1):
                    highCol = lowCol
                else:
                    highCol -= floor((highCol - lowCol) / 2) + 1
            elif char == 'B':
                if (highRow - lowRow == 1):
                    lowRow = highRow
                else:
                    lowRow += ceil((highRow - lowRow) / 2)
            elif char == 'R':
                if (highCol - lowCol == 1):
                    lowCol = highCol
                else:
                    lowCol += ceil((highCol - lowCol) / 2)

        seatId = highRow * 8 + highCol
        allSeatIds.append(seatId)
        if highestSeatId < seatId:
            highestSeatId = seatId
    print("Part 1 : {}".format(highestSeatId))


def part2():
    mySeat = 0
    prev = 0
    for i in range(len(allSeatIds)):
        curr = allSeatIds[i]
        if (i == 0):
            prev = curr
        if (curr - prev > 1):
            mySeat = curr - 1
        prev = curr
    print("Part 2 : {}".format(mySeat))


part1()
allSeatIds.sort()
part2()