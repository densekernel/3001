# Extracting static data and storing in postgres

import psycopg2
import xml.etree.ElementTree as ET
from decimal import *

f = open('/Users/navidhg/Desktop/bikedata.txt', 'r')

# Get second line that has our static data
f.readline()
line = f.readline()
print line
root = ET.fromstring(line)

# Get DB connection
conn = psycopg2.connect("dbname=bikehire user=navidhg")
cur = conn.cursor()
print "Got connection"

# Position of static fields
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

for child in root:
	stopId = int(child[0].text)
	print child
	print stopId
	
	name = child[1].text
	print name

	terminalName = child[2].text
	print terminalName

	latitude = Decimal(child[3].text)
	print latitude

	longitude = Decimal(child[4].text)
	print longitude

	
	installDate = -1
	installDateRaw = child[7].text
	if installDateRaw is None:
		print "Found none"
	else:
		installDate = long(installDateRaw)
	print installDate

	removalDate = -1
	removalDateRaw = child[8].text
	if removalDateRaw is None:
		print "Found none"
	else:
		removalDate = long(removalDateRaw)
	print removalDate

	temporaryRaw = child[9].text
	temporary = True
	if temporaryRaw == "false":
		temporary = False
	print temporary

	cur.execute("INSERT INTO static VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (stopId, name, terminalName, latitude, longitude, installDate, removalDate, temporary))
	print "going to commit"
	conn.commit()

cur.close()
conn.close()