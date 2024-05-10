import random

pointlist = []
resolution = 1 #to counteract percentage error of (res)%, we omit all points that deviate from (res)% from others to avoid duplicate points as rover moves.
def appendpoint(x, y, z):
    curpoint = [(round(x/resolution)*resolution), (round(y/resolution)*resolution), (round(z/resolution)*resolution)]
    if not curpoint in pointlist:
        pointlist.append(curpoint)
for i in range(100000):
    appendpoint(random.uniform(1, 10), random.uniform(1, 10), random.uniform(1, 10))

print(pointlist)
print(len(pointlist))