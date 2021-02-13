from functools import reduce, partial


def changePlacesPart1(floor):
    tempFloor = []
    for i in range(len(floor)):
        tempRow = []
        for j in range(len(floor[i])):
            if floor[i][j] == '.':
                tempRow.append('.')
            elif floor[i][j] == 'L' and checkAdjacent(i, j, floor) == 0:
                tempRow.append('#')
            elif floor[i][j] == '#' and checkAdjacent(i, j, floor) > 3:
                tempRow.append('L')
            else:
                tempRow.append(floor[i][j])
        tempFloor.append(tempRow)
    return tempFloor


def changePlacesPart2(floor):
    tempFloor = []
    for i in range(len(floor)):
        tempRow = []
        for j in range(len(floor[i])):
            if floor[i][j] == '.':
                tempRow.append('.')
            elif floor[i][j] == 'L' and checkForSeat(i, j, floor) == 0:
                tempRow.append('#')
            elif floor[i][j] == '#' and checkForSeat(i, j, floor) > 4:
                tempRow.append('L')
            else:
                tempRow.append(floor[i][j])
        tempFloor.append(tempRow)
    return tempFloor


def checkForSeat(row, col, floor):
    occupied = 0
    for i in range(row - 1, -1, -1):
        if floor[i][col] == '#':
            occupied += 1
            break
        elif floor[i][col] == 'L':
            break
    for i in range(row + 1, len(floor)):
        if floor[i][col] == '#':
            occupied += 1
            break
        elif floor[i][col] == 'L':
            break
    for i in range(col - 1, -1, -1):
        if floor[row][i] == '#':
            occupied += 1
            break
        elif floor[row][i] == 'L':
            break
    for i in range(col + 1, len(floor[0])):
        if floor[row][i] == '#':
            occupied += 1
            break
        elif floor[row][i] == 'L':
            break
    j = col - 1
    for i in range(row - 1, -1, -1):
        if j == -1:
            break
        if floor[i][j] == '#':
            occupied += 1
            break
        elif floor[i][j] == 'L':
            break
        j -= 1

    j = col + 1
    for i in range(row - 1, -1, -1):
        if j == len(floor[0]):
            break
        if floor[i][j] == '#':
            occupied += 1
            break
        elif floor[i][j] == 'L':
            break
        j += 1

    j = col - 1
    for i in range(row + 1, len(floor)):
        if j == -1:
            break
        if floor[i][j] == '#':
            occupied += 1
            break
        elif floor[i][j] == 'L':
            break
        j -= 1

    j = col + 1
    for i in range(row + 1, len(floor)):
        if j == len(floor[0]):
            break
        if floor[i][j] == '#':
            occupied += 1
            break
        elif floor[i][j] == 'L':
            break
        j += 1

    return occupied


def checkAdjacent(row, col, floor):
    occupied = 0
    rowAbove = row - 1
    rowBelow = row + 1
    leftCol = col - 1
    rightCol = col + 1
    if rowAbove >= 0:
        for i in range(leftCol, rightCol + 1):
            if i < 0 or i >= len(floor[0]):
                continue
            if floor[rowAbove][i] == '#':
                occupied += 1
    if rowBelow < len(floor):
        for i in range(leftCol, rightCol + 1):
            if i < 0 or i >= len(floor[0]):
                continue
            if floor[rowBelow][i] == '#':
                occupied += 1
    if leftCol >= 0 and floor[row][leftCol] == '#':
        occupied += 1
    if rightCol < len(floor[0]) and floor[row][rightCol] == '#':
        occupied += 1
    return occupied


def differentFloor(floor, tempFloor):
    for i in range(len(floor)):
        for j in range(len(floor[i])):
            if floor[i][j] != tempFloor[i][j]:
                return True
    return False


def totalOccupied(floor):
    occupied = 0
    for i in range(len(floor)):
        occupied += reduce(
            lambda count, char: count + 1
            if char == '#' else count, floor[i], 0)
    return occupied
