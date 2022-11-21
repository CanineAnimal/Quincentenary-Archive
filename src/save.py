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
		print('Delay since last request: ' + str(time.time() - originalTime) + ' s. Fetching ' + str(item ) + '.html...')
		page = threadLink + '&start=' + str(item * 25)
		html = requests.get(page, headers={'User-Agent': 'Script by The Ice States to save a Forum 7 thread.'}).text.replace('href="./', 'href="https://forum.nationstates.net/').replace('src="./', 'href="https://forum.nationstates.net/').replace('src="//', 'src="https://').replace('href="//', 'href="https://')
		print('Saving ' + str(item ) + '.html...')
		originalTime = time.time()
		file = open(tn + '/' + str(item) + '.html', 'w', encoding='utf-8')
		file.write(html)
		file.close()
		print('Saved page ' + str(item + 1) + ' in HTML!')

		# Wait to avoid violating NS rate limits
		if time.time() < originalTime + 8:
			time.sleep(originalTime + 8 - time.time())
		
		# Save page PDF
		print('Delay since last request: ' + str(time.time() - originalTime) + ' s. Saving ' + str(item) + '.pdf...')
		pdfkit.from_url(page, tn + '/' + str(item) + '.pdf', options={'custom-header':[('User-Agent','Script by The Ice States to save a Forum 7 thread.')]})
		originalTime = time.time()
		print('Saved page ' + str(item + 1) + ' in PDF!')
		
		# Second rate limit wait
		if time.time() < originalTime + 8:
			time.sleep(originalTime + 8 - time.time())
		
		item += 1
	except:
		print('Unable to save page ' + str(item + 1) + '.')
