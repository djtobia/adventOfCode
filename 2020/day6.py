print('Python')
file = open('./input/day6.txt')
file = [x.strip() for x in file.readlines()]

groupCountMap = {}


def countTotalsInMap(totalPeople, answerMap):
    count = 0
    for val in answerMap.values():
        if val == totalPeople:
            count += 1
    return count


totalCount = 0
allInGroupCount = 0
lineCount = 0
for line in file:
    if line == "":
        totalCount += len(groupCountMap)
        allInGroupCount += countTotalsInMap(lineCount, groupCountMap)
        groupCountMap.clear()
        lineCount = 0
        continue

    lineCount += 1
    for char in line:
        if char not in groupCountMap:
            groupCountMap[char] = 1
        else:
            groupCountMap[char] += 1

totalCount += len(groupCountMap)
allInGroupCount += countTotalsInMap(lineCount, groupCountMap)
print("Part 1 : {}".format(totalCount))
print("Part 2 : {}".format(allInGroupCount))