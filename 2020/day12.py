def changeDirection(direction, degrees):
    numberOfTurns = int(degrees / 90)
    dirs = ['N', 'E', 'S', 'W']
    index = dirs.index(facing)
    for i in range(numberOfTurns):
        if direction == 'R':
            index += 1
            if (index >= 4):
                index = 0
        else:
            index -= 1
            if index < 0:
                index = 3
    return dirs[index]


def changeWaypointDirection(direction, degrees):
    numberOfTurns = int(degrees / 90)
    dirs = ['NE', 'SE', 'SW', 'NW']
    currentDir = 'N' if waypoint['NS'] > 0 else 'S'
    currentDir += 'E' if waypoint['EW'] > 0 else 'W'
    index = dirs.index(currentDir)
    for i in range(numberOfTurns):
        if direction == 'R':
            index += 1
            if index >= 4:
                index = 0
        else:
            index -= 1
            if index < 0:
                index = 3

        temp = waypoint['EW']
        if dirs[index] == 'NE':
            if direction == 'R':
                waypoint['EW'] = waypoint['NS']
                waypoint['NS'] = temp * -1
            else:
                tempDir = waypoint['EW']
                waypoint['EW'] = waypoint['NS'] * -1
                waypoint['NS'] = tempDir
        elif dirs[index] == 'SE':
            if direction == 'R':
                waypoint['EW'] = waypoint['NS']
                waypoint['NS'] = temp * -1
            else:
                waypoint['EW'] = waypoint['NS'] * -1
                waypoint['NS'] = temp
        elif dirs[index] == 'SW':
            if direction == 'R':
                waypoint['EW'] = waypoint['NS']
                waypoint['NS'] = temp * -1
            else:
                waypoint['EW'] = waypoint['NS'] * -1
                waypoint['NS'] = temp
        elif dirs[index] == 'NW':
            if direction == 'R':
                waypoint['EW'] = waypoint['NS']
                waypoint['NS'] = temp * -1
            else:
                waypoint['EW'] = waypoint['NS'] * -1
                waypoint['NS'] = temp
        currentDir = dirs[index]


print('Python')
file = open('./input/day12.txt')
file = [x.strip() for x in file.readlines()]
directions = {
    'NORTH': 'N',
    'EAST': 'E',
    'SOUTH': 'S',
    'WEST': 'W',
    'FORWARD': 'F'
}

facing = directions['EAST']
waypoint = {'EW': 10, 'NS': 1}
totalsP1 = {'N': 0, 'E': 0, 'S': 0, 'W': 0}
totalsP2 = {'N': 0, 'E': 0, 'S': 0, 'W': 0}

for instruction in file:
    direction = instruction[0]
    value = int(instruction[1:])
    if direction == directions['FORWARD']:
        totalsP1[facing] += value
    elif direction == directions['EAST']:
        totalsP1['E'] += value
    elif direction == directions['SOUTH']:
        totalsP1['S'] += value
    elif direction == directions['WEST']:
        totalsP1['W'] += value
    elif direction == directions['NORTH']:
        totalsP1['N'] += value
    else:
        facing = changeDirection(direction, value)

print('Part 1 : {}'.format((abs(totalsP1['E'] - totalsP1['W'])) +
                           abs(totalsP1['N'] - totalsP1['S'])))

for instruction in file:
    direction = instruction[0]
    value = int(instruction[1:])
    if direction == directions['FORWARD']:
        if waypoint['NS'] > 0:
            totalsP2['N'] += waypoint['NS'] * value
        elif waypoint['NS'] < 0:
            totalsP2['S'] += abs(waypoint['NS'] * value)

        if waypoint['EW'] > 0:
            totalsP2['E'] += waypoint['EW'] * value
        elif waypoint['EW'] < 0:
            totalsP2['W'] += abs(waypoint['EW'] * value)
    elif direction == directions['EAST']:
        waypoint['EW'] += value
    elif direction == directions['SOUTH']:
        waypoint['NS'] -= value
    elif direction == directions['WEST']:
        waypoint['EW'] -= value
    elif direction == directions['NORTH']:
        waypoint['NS'] += value
    else:
        changeWaypointDirection(direction, value)

print('Part 2 : {}'.format(
    abs(totalsP2['E'] - totalsP2['W']) + abs(totalsP2['N'] - totalsP2['S'])))
