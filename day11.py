from helpers.day11 import helpers

print('Python')
file = open('./input/day11.txt')
file = [x.strip() for x in file.readlines()]

floor = []
for line in file:
    row = []
    for chair in list(line):
        row.append(chair)
    floor.append(row)

while True:
    tempFloor = helpers.changePlacesPart1(floor)
    if (not helpers.differentFloor(floor, tempFloor)):
        break
    else:
        floor = tempFloor

print('Part 1 : {}'.format(helpers.totalOccupied(floor)))
floor.clear()
for line in file:
    row = []
    for chair in list(line):
        row.append(chair)
    floor.append(row)

while True:
    tempFloor = helpers.changePlacesPart2(floor)
    if not helpers.differentFloor(floor, tempFloor):
        break
    else:
        floor = tempFloor

print('Part 2 : {}'.format(helpers.totalOccupied(floor)))