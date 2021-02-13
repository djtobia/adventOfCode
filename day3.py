from functools import reduce
print('Python')
file = open('./input/day3.txt')
file = [x.strip() for x in file.readlines()]
cols = len(file[0])


class slopes:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def Print(self):
        print('{} {}'.format(self.x, self.y))

    def GetX(self):
        return self.x

    def GetY(self):
        return self.y


slopes = [slopes(1, 1), slopes(5, 1), slopes(7, 1), slopes(1, 2)]


def part1():
    totalTrees = 0
    x = 0

    for col in range(1, len(file)):
        for i in range(3):
            x += 1
            if (x == cols):
                x = 0
        if (file[col][x] == "#"):
            totalTrees += 1
    print("Part 1 : {}".format(totalTrees))
    return totalTrees


def part2(totals, slopes):
    for slope in slopes:
        x = 0
        totalTrees = 0
        for col in range(slope.GetY(), len(file), slope.GetY()):
            for i in range(slope.GetX()):
                x += 1
                if (x == cols):
                    x = 0
            if (file[col][x] == '#'):
                totalTrees += 1
        totals.append(totalTrees)
    totalTreesAllSlopes = reduce(lambda x, y: (x * y), totals)
    print("Part 2 : {}".format(totalTreesAllSlopes))


part2([part1()], slopes)