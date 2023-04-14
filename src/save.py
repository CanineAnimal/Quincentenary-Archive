# Dependencies: PdfKit, WkHtmlToPdf, Lxml, Cssselect
# https://cssselect.readthedocs.io/en/latest/
# https://pypi.org/project/pdfkit/
# https://wkhtmltopdf.org/
# https://lxml.de/

# NB: this code is run in a folder wherein threads are stored as folders by this program.
# The saved files are then uploaded manually to the 'QA-Archives' repository using the Github web interface.

# Get modules
import lxml.html as hp
import requests
import pdfkit
import time
import os

# Get inputs
threadLink = input('Enter thread link: ')
pageNo = int(input('Enter the amount of pages: '))
tn = input('Enter shorthand version of thread name: ')

# Create a new directory because the specified path does not exist
if not os.path.exists('./' + tn):
    os.makedirs('./' + tn)

# Loop through thread
tries = 0
item = 412
originalTime = time.time();
while item < pageNo:
	try:	
		# Fetch page HTML
		print('Delay since last request: ' + str(time.time() - originalTime) + ' s. Fetching ' + str(item) + '.html...')
		page = threadLink + '&start=' + str(item * 25)
		html = requests.get(page, headers={'User-Agent': 'Script by The Ice States to save a Forum 7 thread.'}).text
		originalTime = time.time()

		# Fix links to NS website and replace links to forum pages
		html = html.replace('href="./', 'href="https://forum.nationstates.net/').replace('src="./', 'href="https://forum.nationstates.net/').replace('src="//', 'src="https://').replace('href="//', 'href="https://')
		dom = hp.fromstring(html)
		for link in dom.cssselect('.pagination span:nth-of-type(1) a'):
			link.set('href', value=('https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + tn + '/' + str(int(link.text_content()) - 1) + '.html'))
		html = hp.tostring(dom);
		
		# Save page HTML
		print('Saving ' + str(item) + '.html...')
		file = open(tn + '/' + str(item) + '.html', 'wb')
		file.write(html)
		file.close()
		print('Saved page ' + str(item + 1) + ' in HTML!')

		# Replace links to other HTML pages with PDF pages
		dom = hp.fromstring(html)
		for link in dom.cssselect('.pagination span:nth-of-type(1) a'):
			link.set('href', value=('https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + tn + '/' + str(int(link.text_content()) - 1) + '.pdf'))
		html = hp.tostring(dom);
		
		# Save page PDF
		print('Saving ' + str(item) + '.pdf...')
		pdfkit.from_string(html.decode('utf-8'), tn + '/' + str(item) + '.pdf', {'enable-local-file-access': ''})
		print('Saved page ' + str(item + 1) + ' in PDF!')
		
		# Wait to avoid violating NS rate limits
		if time.time() < originalTime + 20:
			time.sleep(originalTime + 20 - time.time())
		
		tries = 0
		item += 1
	except:
		# Move on to next page after three attempts
		tries += 1
		if(tries == 3):
			item += 1
			tries = 0
			print('Unable to save page ' + str(item + 1) + '.')
		else:
			print('Unable to save page ' + str(item + 1) + '. Trying again...')
			# Space consecutive attempts
			time.sleep(10)
