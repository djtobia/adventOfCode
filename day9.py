print('Python')
file = open('./input/day9.txt')
file = [x.strip() for x in file.readlines()]


def part1():
    for i in range(25, len(file)):
        found = False
        num = int(file[i])
        for j in range(i - 25, i):
            for k in range(j + 1, i):
                if int(file[j]) + int(file[k]) == num:
                    found = True
        if not found:
            print('Part 1 : {}'.format(num))
            return num


def part2(num):
    numArray = []
    found = False
    for i in range(len(file)):
        if found:
            break
        total = int(file[i])
        numArray.append(total)
        for j in range(i + 1, len(file)):
            adder = int(file[j])
            if total + adder < num:
                numArray.append(adder)
                total += adder
            elif total + adder > num:
                numArray.clear()
                break
            else:
                numArray.append(adder)
                found = True
                break
    numArray.sort()
    print('Part 2 : {}'.format(numArray[0] + numArray[-1]))


num = part1()
part2(num)
