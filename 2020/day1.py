file = open('./input/day1.txt')
file = [x.strip() for x in file.readlines()]
print("Python")


def part1():
    for index, record in enumerate(file):
        num1 = int(record)
        for j in file[index:]:
            num2 = int(j)
            if (num1 + num2 == 2020):
                print('Part 1 : {}'.format(num1 * num2))


def part2():
    breakFlag = 0
    for index, record1 in enumerate(file):
        num1 = int(record1)
        for record2 in file[index:]:
            num2 = int(record2)
            num3 = 2020 - num1 - num2
            if str(num3) in file:
                print('Part 2 : {}'.format(num3 * num1 * num2))
                breakFlag = 1
                break
        if breakFlag:
            break


part1()
part2()