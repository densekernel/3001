import json
import sys
import urllib2
import matplotlib.pyplot as plt

stationID = sys.argv[1]
urlconn = urllib2.urlopen("http://178.62.32.221:5000/station/" + stationID + "/data")
data = json.load(urlconn)

times = []
bikes = []

for d in data:
	times.append(int(d['sampletime']))
	bikes.append(int(d['nbbikes']))

plt.plot(times, bikes)
plt.show()

urlconn.close()