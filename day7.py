print('Python')


class Bag:
    def __init__(self, bagType, bags=[]):
        self.bagType = bagType
        self.innerBags = bags

    def getInner(self, index):
        return self.innerBags[index]


class InnerBag:
    def __init__(self, num, name):
        self.num = num
        self.name = name


def parseInnerBag(bagString):
    num = int(bagString[0])
    if '.' in bagString:
        bagString = bagString[1:len(bagString) - 5].strip()
    else:
        bagString = bagString[1:len(bagString) - 4].strip()
    return InnerBag(num, bagString)


def checkForShinyGoldBag(bagName, bagMap):
    bag = bagMap[bagName]
    for i in range(len(bag.innerBags)):
        innerBag = bag.getInner(i)
        if (innerBag.name == 'shiny gold'):
            return 1
        else:
            if (checkForShinyGoldBag(innerBag.name, bagMap)):
                return 1
    return 0


def insideBagCount(bagName, bagMap):
    bag = bagMap[bagName]
    if (len(bag.innerBags) == 0):
        return 0
    count = 0
    for i in range(len(bag.innerBags)):
        num = bag.innerBags[i].num
        count += num + num * insideBagCount(bag.innerBags[i].name, bagMap)
    return count


file = open('./input/day7.txt')
file = [x.strip() for x in file.readlines()]
bagMap = {}
for rule in file:
    if "no other" in rule:
        bags = rule.split('bags')
        outerBag = Bag(bags[0].strip())
        bagMap[bags[0].strip()] = outerBag
    else:
        bags = rule.split(',')
        outerBagName = bags[0].split('bags')[0].strip()
        innerBags = []
        innerBags.append(parseInnerBag(bags[0].split('contain')[1].strip()))
        for j in range(1, len(bags)):
            innerBags.append(parseInnerBag(bags[j].strip()))
        bagMap[outerBagName] = Bag(outerBagName, innerBags)
count = 0
for key in bagMap.keys():
    count += checkForShinyGoldBag(key, bagMap)

print("Part 1 : {}".format(count))
print("Part 2 : {}".format(insideBagCount('shiny gold', bagMap)))