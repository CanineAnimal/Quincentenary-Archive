# Dependencies: PdfKit, WkHtmlToPdf
# https://pypi.org/project/pdfkit/
# https://wkhtmltopdf.org/
# Nb: this code is run in a folder wherein threads are stored as folders by this program.
# The saved files are then uploaded manually to the 'QA-Archives' repository using the Github web interface.

# Get modules
import requests
import pdfkit
import time


# Get inputs
threadLink = input('Enter thread link: ')
pageNo = int(input('Enter the amount of pages: '))
tn = input('Enter shorthand version of thread name: ')

# Loop through thread
item = 0
while item < pageNo:
	try:
		# Save page HTML
		print('Fetching ' + str(item ) + '.html...')
		page = threadLink + '&start=' + str(item * 25)
		originalTime = time.time()
		html = requests.get(page, headers={'User-Agent': 'Script by The Ice States to save a Forum 7 thread.'}).text.replace('href="./', 'href="https://forum.nationstates.net/').replace('src="./', 'href="https://forum.nationstates.net/').replace('src="//', 'src="https://').replace('href="//', 'href="https://')
		print('Saving ' + str(item ) + '.html...')
		file = open(tn + '/' + str(item) + '.html', 'w', encoding='utf-8')
		file.write(html)
		file.close()
		print('Saved page ' + str(item + 1) + ' in HTML!')

		# Save page PDF
		print('Saving ' + str(item) + '.pdf...')
		originalTime = time.time()
		pdfkit.from_url(page, tn + '/' + str(item) + '.pdf', options={'custom-header':[('User-Agent','Script by The Ice States to save a Forum 7 thread.')]})
		print('Saved page ' + str(item + 1) + ' in PDF!')
		
		# Wait to avoid violating NS rate limits
		if time.time() < originalTime + 6:
			time.sleep(originalTime + 6 - time.time())
		
		item += 1
	except:
		print('Unable to save page ' + str(item + 1) + '.')
