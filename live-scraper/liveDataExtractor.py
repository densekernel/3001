# Extracting live data

import psycopg2
import xml.etree.ElementTree as ET
from decimal import *

f = open('/Users/navidhg/Desktop/bikedata.txt', 'r')

# Get DB connection
conn = psycopg2.connect("dbname=bikehire user=navidhg")
cur = conn.cursor()
print "Got connection"

# Position of fields
# id 				int 			0
# name 			string 				1
# terminalName	string 				2
# lat				decimal 		3
# long			decimal 			4
# installed		boolean 			5
# locked			boolean 		6
# installDate		long 			7
# removalDate		long 			8
# temporary		boolean  			9
# nbBikes			int  			10
# nbEmptyDocks	int 				11
# nbDocks 		int 				12

# CREATE TABLE live (
# 	stationId integer REFERENCES static(id),
# 	sampleTime bigint,
# 	nbBikes integer,
# 	nbEmptyDocks integer,
# 	nbDocks integer,
# 	installed boolean,
# 	locked boolean,
# 	PRIMARY KEY(stationId, sampleTime)
# )

for line in f:
	# Contains XML data
	if len(line) > 40:
		root = ET.fromstring(line)
		# print root
		# Get sample time
		sampleTime = long(root.attrib["lastUpdate"])
		
		for child in root:
			stationId = int(child[0].text)
			nbBikes = int(child[10].text)
			nbEmptyDocks = int(child[11].text)
			nbDocks = int(child[12].text)
			installed = True
			installedRaw = child[5].text
			if installedRaw == "false":
				installed = False
			locked = True
			lockedRaw = child[6].text
			if lockedRaw == "false":
				locked = False
			try:
				cur.execute("INSERT INTO live VALUES (%s, %s, %s, %s, %s, %s, %s)", (stationId, sampleTime, nbBikes, nbEmptyDocks, nbDocks, installed, locked))
				conn.commit()
				print root
			except:
				i = 1
cur.close()
conn.close()