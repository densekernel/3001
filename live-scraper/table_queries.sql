CREATE TABLE static (
	id integer PRIMARY KEY,
	name text,
	terminalName text,
	lat numeric,
	long numeric,
	installDate bigint,
	removalDate bigint,
	temporary boolean
)

CREATE TABLE live (
	stationId integer REFERENCES static(id),
	sampleTime bigint,
	nbBikes integer,
	nbEmptyDocks integer,
	nbDocks integer,
	installed boolean,
	locked boolean,
	PRIMARY KEY(stationId, sampleTime)
)