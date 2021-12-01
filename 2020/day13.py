from functools import reduce
print('Python')
file = open('./input/day13.txt')
file = [x.strip() for x in file.readlines()]

earliestTimestamp = int(file[0])
runningBusses = list(filter(lambda id: id != 'x', file[1].split(',')))

nextEarliest = 0
counter = earliestTimestamp
busId = 0
while not nextEarliest:
    for i in range(len(runningBusses)):
        if counter % int(runningBusses[i]) == 0:
            nextEarliest = counter
            busId = int(runningBusses[i])
            break
    counter += 1

print('Part 1 : {}'.format(busId * (nextEarliest - earliestTimestamp)))

allBusses = file[1].split(',')
allBusses = list(map(lambda val: 1 if val == 'x' else int(val), allBusses))


def findBus(last, multiplier, current, i):
    found = last
    last += 1
    while True:
        if found + i + 1 % current == 0:
            return [found, multipier * current]
        found += multiplier


print('Part 2 : {}'.format(reduce(findBus(), [allBusses[0], allBusses[0]])))
