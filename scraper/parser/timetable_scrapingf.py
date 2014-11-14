import bs4
import pymysql
import urllib.request

response = urllib.request.urlopen('http://tubestatus.net/timeline')

soup = bs4.BeautifulSoup(response)

lines_table = soup.findAll('div', {'class': 'history_left'})[0] \
                  .findAll('table', {'class': 'history'})[0]

timetable = soup.findAll('div', {'class': 'history_right'})[0] \
                .findAll('div', {'class': 'scrollbig'})[0] \
                .findAll('table')[0]

for line_row, time_row in zip(lines_table.findAll('tr'), timetable.findAll('tr')):
  print(line_row.findAll('td')[0].findAll('font')[0].findAll('b')[0].string, ':',
        [cell.findAll('a')[0].string
         for cell in time_row.findAll('td') if cell.findAll('a') != []])

#print(timetable)
