print('Python')
file = open('./input/day8.txt')
file = [x.strip() for x in file.readlines()]


def part1():
    acc = 0
    visitedIndexes = [-1] * len(file)
    index = 0
    while True:
        if visitedIndexes[index] == 1:
            break
        visitedIndexes[index] = 1
        op = file[index].split(" ")
        if 'nop' in op[0]:
            index += 1
        elif 'acc' in op[0]:
            acc += int(op[1])
            index += 1
        elif 'jmp' in op[0]:
            index += int(op[1])
    print('Part 1 : {}'.format(acc))


def part2():
    acc = 0
    visitedIndexes = [-1] * len(file)
    index = 0
    jmp = []
    iteration = 1
    while True:
        if index >= len(file):
            break
        if visitedIndexes[index] == 1:
            acc = 0
            visitedIndexes = [-1] * len(file)
            index = 0
            iteration += 1
        else:
            visitedIndexes[index] = 1
            op = file[index].split(" ")
            if 'nop' in op[0]:
                index += 1
            elif 'acc' in op[0]:
                acc += int(op[1])
                index += 1
            elif 'jmp' in op[0]:
                if len(jmp) != iteration:
                    if index not in jmp:
                        jmp.append(index)
                        index += 1
                    else:
                        index += int(op[1])
                else:
                    index += int(op[1])
    print('Part 2 : {}'.format(acc))


part1()
part2()