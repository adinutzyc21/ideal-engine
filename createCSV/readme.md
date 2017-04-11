# Create a CSV to import into the Compare App

In particular, this parses an [apartments.com](apartments.com) search result based on some criteria that are present in the page. It's a scraper for the result listing and produces a CSV that has all the entries nicely parsed. These are the criteria I'm using:
`'Option Name', 'URL', 'Contact', 'Address', 'Distance', 'Duration', 'Map', 'Pet Policy', 'Parking', 'Gym', 'Kitchen', 'Amenities', 'Features', 'Living Space', 'Rent', 'Monthly Fees', 'One Time Fees', 'Lease Info', 'Services', 'Property Info', 'Indoor Info', 'Outdoor Info'` and they come from the entries that apartments.com shows on the page as well as from the Google Maps API (given an address to commute to, I am getting the approximate transit distance and time).

### How to use:

Please note that this assumes you have python installed. You can install it from [here](https://www.python.org/downloads/).

1. Rename config_example.ini to config.ini.
2. Search for apartments on apartments.com. Use your own criteria using the app. Copy the URL.
    - Replace the parenthesis after "fullURL:" in config.ini with the copied URL.
3. Get an API key from [Google Maps API](https://developers.google.com/maps/documentation/distance-matrix/get-api-key) (this is for calculating distances / times using Google Maps)
    - Replace the parenthesis after "mapsAPIKey:" in config.ini with the key.
4. Search for the address you want to commute to on [Google Maps](https://www.google.com/maps). Copy the Google formatted address. For example, for the Empire State building, that address looks like "350 5th Ave New York, NY 10118"
    - Replace the parenthesis after "targetAddress:" in config.ini with the copied address.
5. If you want your output file to be named something output.csv, change the name of the file (output) after "fname:" in config.ini.

Run `python parse_apartments.py` to generate the CSV file that you can then import.
