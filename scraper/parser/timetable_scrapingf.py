import bs4
import re


def extractDesc(string):
    m = re.search('<br\/>(?:.*)delays(?:\ between)?\ (.*)\ (?:to|and)\ (.*)\ due(?:.*)<br\/>', string)
    if m:
        return (m.group(1), m.group(2))
    return ''


def getLineName(line_row):
    return line_row.findAll('td')[0].findAll('font')[0].findAll('b')[0].string


def isValidCell(cell):
    return cell.findAll('a') != []


def getDescription(cell):
    return extractDesc(cell.findAll('div')[0].__str__())


def extract(filename):

    txt = open(filename)
    response = txt.read()

    soup = bs4.BeautifulSoup(response)

    lines_table = soup.findAll('div', {'class': 'history_left'})[0] \
                    .findAll('table', {'class': 'history'})[0]

    timetable = soup.findAll('div', {'class': 'history_right'})[0] \
                  .findAll('div', {'class': 'scrollbig'})[0] \
                  .findAll('table')[0]

    lines = []
    for line_row, time_row in zip(lines_table.findAll('tr'), timetable.findAll('tr')):
        lines += [(getLineName(line_row),
            [(cell.findAll('a')[0].string, getDescription(cell))
                for cell in time_row.findAll('td') if isValidCell(cell)])]

    txt.close()
    return lines


def main():
    for x in extract("../raw/2014-01-01.html"):
        for y in x[1]:
            if (y[0] == 'SD'):
                print(y)

main()