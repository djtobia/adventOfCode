print('Python')
file = open('./input/day10.txt')
file = [x.strip() for x in file.readlines()]
adaptors = list(map(lambda x: int(x), file))
adaptors.sort()


def part1():
    oneDiffs = 0
    threeDiffs = 1
    prev = 0
    for i in range(len(adaptors)):
        num = adaptors[i]
        if num - prev == 1:
            oneDiffs += 1
        elif num - prev == 3:
            threeDiffs += 1
        prev = num
    print('Part 1 : {}'.format(oneDiffs * threeDiffs))


def part2():
    pow7 = 0
    pow2 = 0
    for i in range(len(adaptors) - 1):
        numberThreeBehind = adaptors[i - 3] if i >= 3 else -1000
        if adaptors[i + 1] - numberThreeBehind == 4:
            pow7 += 1
            pow2 -= 2
        elif adaptors[i + 1] - adaptors[i - 1] == 2:
            pow2 += 1
    print('Part 2 : {}'.format((2**pow2) * (7**pow7)))


part1()
adaptors.insert(0, 0)
adaptors.append(adaptors[-1] + 3)
part2()