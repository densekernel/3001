import bs4
import re
import csv
import threading
from os import listdir


def extractDesc(string):
    m = re.search('<br\/>(?:.*)delays(?:\ between)?\ (.*)\ (?:to|and)\ (.*)\ due(?:.*)<br\/>', string)
    if m:
        return (m.group(1), m.group(2))
    return ''


def getLineName(line_row):
    return line_row.findAll('td')[0].findAll('font')[0].findAll('b')[0].string


def isValidCell(cell):
    return cell.findAll('a') != []


def notGS(cell):
    return cell.findAll('a')[0].string != "GS"


def getDescription(cell):
    return extractDesc(cell.findAll('div')[0].__str__())


def extract(date):
    print ("DOIN'", date)

    txt = open('../raw/' + date + '.html')
    response = txt.read()

    soup = bs4.BeautifulSoup(response)

    lines_table = soup.findAll('div', {'class': 'history_left'})[0] \
                    .findAll('table', {'class': 'history'})[0]

    timetable = soup.findAll('div', {'class': 'history_right'})[0] \
                  .findAll('div', {'class': 'scrollbig'})[0] \
                  .findAll('table')[0]

    lines = []
    for line_row, time_row in zip(lines_table.findAll('tr'), timetable.findAll('tr')):
        lines += [(
                cell.findAll('a')[0].string,
                getDescription(cell),
                24 - (i+1)*0.25,
                getLineName(line_row),
                date
            )
            for i, cell in enumerate(filter(isValidCell, time_row.findAll('td'))) if notGS(cell)]

    txt.close()
    return lines

def toCSV(array, name):
    # for x in array:
    #     asStr = x.__str__()
    #     print(asStr[1:len(asStr)-1])

    with open(name+'.csv','w') as out:
        csv_out=csv.writer(out)
        for row in array:
            csv_out.writerow(row)

def execute(array, name):

        toCSV(extract(array), name)


def chunks(l, n):
    for i in xrange(0, len(l), n):
        yield l[i:i+n]

def main():
    # for x in extract("../raw/2014-01-01.html"):
    #     for y in x[1]:
    #         if (y[0] == 'SD'):
    #             print(y)
    # print(extract("2014-01-01"))
    # for x in extract("../raw/2014-01-01.html")[0]:
    #     for y in x: print (y)
    onlyfiles = reversed([f.replace('.html', '') for f in listdir('../raw') ])
    l = []
    for date in onlyfiles:
        try:
            data = [extract(date)]
            toCSV(data, date)
        except:
            print ("Failed for date", date)



main()