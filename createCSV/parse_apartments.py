"""Parse an apartments.com search result page and export to CSV."""
import urllib2
import csv
import json
import ConfigParser
import re
from bs4 import BeautifulSoup

def create_csv(page_url, maps_url, target_address, maps_api_key, fname):
    """Create a CSV file with information that can be imported into ideal-engine"""

    csv_file = open(fname, 'wt')
    try:
        writer = csv.writer(csv_file)
        # this is the header (make sure it matches with the fields in write_parsed_to_csv)
        writer.writerow(('Option Name', 'URL', 'Contact', 'Address', 'Distance', 'Duration',
                         'Map', 'Pet Policy', 'Parking', 'Gym', 'Kitchen', 'Amenities', 'Features',
                         'Living Space', 'Rent', 'Monthly Fees', 'One Time Fees', 'Lease Info',
                         'Services', 'Property Info', 'Indoor Info', 'Outdoor Info'))
        # parse current entire apartment list including pagination
        write_parsed_to_csv(page_url, maps_url, target_address, maps_api_key, writer)
    finally:
        csv_file.close()

def write_parsed_to_csv(page_url, maps_url, target_address, maps_api_key, writer):
    """Given the current page URL, extract the information from each apartment in the list"""

    # read the current page
    page = urllib2.urlopen(page_url).read()
    # soupify the current page
    soup = BeautifulSoup(page, 'html.parser')
    soup.prettify()

    # only look in this region
    soup = soup.find('div', class_='placardContainer')

    # append the current apartments to the list
    for item in soup.find_all('article', class_='placard'):
        url = item.find('a', class_='placardTitle').get('href')
        rent = item.find('span', class_='altRentDisplay').getText() \
                    .encode('ascii', 'ignore').strip()
        contact = ''
        obj = item.find('div', class_='phone')
        if obj != None:
            contact = obj.getText().encode('ascii', 'ignore').strip()
        fields = parse_apartment_information(url, maps_url, target_address, maps_api_key)
        writer.writerow((fields['name'], url, contact, fields['address'], fields['distance'],
                         fields['duration'], fields['map'], fields['petPolicy'], fields['parking'],
                         fields['gym'], fields['kitchen'], fields['amenities'], fields['features'],
                         fields['space'], rent, fields['monthFees'], fields['onceFees'],
                         fields['lease'], fields['services'], fields['info'], fields['indoor'],
                         fields['outdoor']))

    # get the next page URL for pagination
    next_url = soup.find('a', class_='next')
    # if there's only one page this will actually be none
    if next_url is None:
        return
    # get the actual next URL address
    next_url = next_url.get('href')
    # recurse until the last page
    if next_url is not None and next_url != 'javascript:void(0)':
        write_parsed_to_csv(next_url, maps_url, target_address, maps_api_key, writer)

def parse_apartment_information(url, maps_url, target_address, maps_api_key):
    """For every apartment page, populate the required fields to be written to CSV"""

    # read the current page
    page = urllib2.urlopen(url).read()

     # soupify the current page
    soup = BeautifulSoup(page, 'html.parser')
    soup.prettify()

    # the information we need to return as a dict
    fields = {}

    # get the name of the property
    fields['name'] = soup.find('h1', class_='propertyName').getText() \
                        .encode('ascii', 'ignore').strip()

    # get the address of the property
    fields['address'] = get_property_address(soup)

    # get the distance and the time from google (approximate, not sure if this uses
    # actual transit info since I am not a paying customer)
    maps_url += '&origins=' + target_address.replace(' ', '+') + '&destinations=' + \
                 fields['address'].replace(' ', '+') + '&key=' + maps_api_key
    # read and parse the google maps distance / duration response from the api
    obj = json.loads(urllib2.urlopen(maps_url).read())
    # populate the distance / duration fields
    fields['distance'] = obj['rows'][0]['elements'][0]['distance']['text'].encode('ascii', 'ignore')
    fields['duration'] = obj['rows'][0]['elements'][0]['duration']['text'].encode('ascii', 'ignore')
    # get the link to open in maps
    fields['map'] = 'https://www.google.com/maps/place/' + fields['address'].replace(' ', '+')

    # get one time fees
    obj = soup.find('div', class_='monthlyFees')
    fields['monthFees'] = ''
    if obj is not None:
        for expense in obj.find_all('div', class_='fee'):
            fields['monthFees'] += '* ' + expense.find('div', class_='descriptionWrapper') \
                                    .getText().encode('ascii', 'ignore').strip() + ': ' + \
                                    soup.find('div', class_='priceWrapper').getText() \
                                    .encode('ascii', 'ignore').strip() + '\n'

    # get monthly fees
    obj = soup.find('div', class_='oneTimeFees')
    fields['onceFees'] = ''
    if obj is not None:
        for expense in obj.find_all('div', class_='fee'):
            fields['onceFees'] += '* ' + expense.find('div', class_='descriptionWrapper') \
                                  .getText().encode('ascii', 'ignore').strip() + ': ' + \
                                  soup.find('div', class_='priceWrapper').getText() \
                                  .encode('ascii', 'ignore').strip() + '\n'

    # remove ending \n
    fields['monthFees'] = fields['monthFees'].strip()
    fields['onceFees'] = fields['onceFees'].strip()

    # only look in this section (other sections are for example for printing)
    soup = soup.find('section', class_='specGroup js-specGroup')

    # get the pet policy of the property
    fields['petPolicy'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                          re.sub(' +', ' ', soup.find('div', class_='petPolicyDetails') \
                          .getText()))).strip()

    # get parking information
    obj = soup.find('div', class_='parkingDetails')
    if obj is None:
        fields['parking'] = ''
    else:
        fields['parking'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                            re.sub(' +', ' ', obj.getText()))).strip()

    # get the amenities description
    obj = soup.find('i', class_='featuresIcon')
    if obj is None:
        fields['amenities'] = ''
    else:
        fields['amenities'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                              re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'property information'
    obj = soup.find('i', class_='propertyIcon')
    fields['features'] = ''
    fields['info'] = ''
    if obj is not None:
        for obj in soup.find_all('i', class_='propertyIcon'):
            if obj.parent.findNext('h3').getText() == 'Features':
                fields['features'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                                re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()
            if obj.parent.findNext('h3').getText() == 'Property Information':
                fields['info'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                                re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'interior information'
    obj = soup.find('i', class_='interiorIcon')
    if obj is None:
        fields['indoor'] = ''
    else:
        fields['indoor'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                         re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'outdoor information'
    obj = soup.find('i', class_='parksIcon')
    if obj is None:
        fields['outdoor'] = ''
    else:
        fields['outdoor'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                          re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'gym information'
    obj = soup.find('i', class_='fitnessIcon')
    if obj is None:
        fields['gym'] = ''
    else:
        fields['gym'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                      re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'kitchen information'
    obj = soup.find('i', class_='kitchenIcon')
    if obj is None:
        fields['kitchen'] = ''
    else:
        fields['kitchen'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                          re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'services information'
    obj = soup.find('i', class_='servicesIcon')
    if obj is None:
        fields['services'] = ''
    else:
        fields['services'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                           re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the 'living space information'
    obj = soup.find('i', class_='sofaIcon')
    if obj is None:
        fields['space'] = ''
    else:
        fields['space'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                        re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    # get the lease length
    obj = soup.find('i', class_='leaseIcon')
    if obj is None:
        fields['lease'] = ''
    else:
        fields['lease'] = re.sub(u'\u2022', '* ', re.sub('(\r?\n *)+', '\n', \
                        re.sub(' +', ' ', obj.parent.findNext('ul').getText()))).strip()

    return fields

def get_property_address(soup):
    """Given a beautifulSoup parsed page, return the full address of the property"""

    obj = soup.find(itemprop='streetAddress')
    street_address = obj.get('content')
    if street_address is None:
        street_address = obj.getText().encode('ascii', 'ignore').strip()

    obj = soup.find(itemprop='addressLocality')
    address_locality = obj.get('content')
    if address_locality is None:
        address_locality = obj.getText().encode('ascii', 'ignore').strip()

    obj = soup.find(itemprop='addressRegion')
    address_region = obj.get('content')
    if address_region is None:
        address_region = obj.getText().encode('ascii', 'ignore').strip()

    obj = soup.find(itemprop='postalCode')
    postal_code = obj.get('content')
    if postal_code is None:
        postal_code = obj.getText().encode('ascii', 'ignore').strip()

    return street_address + ', ' + address_locality + ', ' + address_region + ' ' + postal_code

def main():
    """Read from the config file"""
    conf = ConfigParser.ConfigParser()
    conf.read('config.ini')

    url = conf.get('all', 'fullURL')
    maps_api_key = conf.get('all', 'mapsAPIKey')
    maps_url = conf.get('all', 'mapsURL')
    target_address = conf.get('all', 'targetAddress')
    fname = conf.get('all', 'fname') + '.csv'

    create_csv(url, maps_url, target_address, maps_api_key, fname)

if __name__ == '__main__': main()
