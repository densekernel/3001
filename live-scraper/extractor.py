# Setting up postgres with scraped data

import psycopg2
import xml.etree.ElementTree as ET
from decimal import *

# Position of fields in XML records
# id 				int 			0
# name 				string 			1
# terminalName		string 			2
# lat				decimal 		3
# long				decimal 		4
# installed			boolean 		5
# locked			boolean 		6
# installDate		long 			7
# removalDate		long 			8
# temporary			boolean 		9
# nbBikes			int  			10
# nbEmptyDocks		int 			11
# nbDocks 			int 			12

dataPath = '/Users/navidhg/Desktop/bikedata.txt'

# Get DB connection
conn = psycopg2.connect("dbname=bikehire user=navidhg")
cur = conn.cursor()
print "Got connection to postgres"

# Create tables
cur.execute("CREATE TABLE static4 (\
	id integer PRIMARY KEY,\
	name text,\
	terminalName text,\
	lat numeric,\
	long numeric,\
	installDate bigint,\
	removalDate bigint,\
	temporary boolean\
)")

cur.execute("CREATE TABLE live4 (\
	stationId integer REFERENCES static(id),\
	sampleTime bigint,\
	nbBikes integer,\
	nbEmptyDocks integer,\
	nbDocks integer,\
	installed boolean,\
	locked boolean,\
	PRIMARY KEY(stationId, sampleTime)\
)")

conn.commit()

# Read in data
f = open(dataPath, 'r')
i = 1

for line in f:
	# If length is over 40, contains XML data
	if len(line) > 40:
		root = ET.fromstring(line)
		# Get sample time
		sampleTime = long(root.attrib["lastUpdate"])
		print "Processing for sample time", sampleTime

		for child in root:

			#Static data
			stopId = int(child[0].text)
			
			name = child[1].text

			terminalName = child[2].text

			latitude = Decimal(child[3].text)

			longitude = Decimal(child[4].text)

			installDate = -1
			installDateRaw = child[7].text
			if installDateRaw is None:
				pass
			else:
				installDate = long(installDateRaw)

			removalDate = -1
			removalDateRaw = child[8].text
			if removalDateRaw is None:
				pass
			else:
				removalDate = long(removalDateRaw)

			temporaryRaw = child[9].text
			temporary = True
			if temporaryRaw == "false":
				temporary = False


			# Live data
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


			# Commit static values
			try:
				cur.execute("INSERT INTO static4 VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", \
				(stopId, name, terminalName, latitude, longitude, installDate, removalDate, temporary))
				conn.commit()
				i = i + 1
				if i > 1:
					print "new record found, id", stopId
			except:
				conn.rollback()

			# Commit live values 
			try:
				cur.execute("INSERT INTO live4 VALUES (%s, %s, %s, %s, %s, %s, %s)", (stationId, sampleTime, nbBikes, nbEmptyDocks, nbDocks, installed, locked))
				conn.commit()
			except Exception as err:
				conn.rollback()

f.close()

cur.close()
conn.close()