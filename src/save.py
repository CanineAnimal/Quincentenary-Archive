# Dependencies: Lxml, Cssselect
# https://cssselect.readthedocs.io/en/latest/
# https://lxml.de/

# NB: this code is run in a folder wherein threads are stored as folders by this program.
# Forum pages are saved to the Internet Archive to manage repository sizes.

# Get modules
import lxml.html as hp
import requests
import time
import os

def getMarkup(link, userAgent):
	result = requests.get(link, headers={'User-Agent': userAgent})
	if not result.ok:
		raise RuntimeError("Request failed")
	return result.text

def getPageNo(threadLink, userAgent):
	html = getMarkup(threadLink, userAgent)
	html = html.replace('href="./', 'href="https://forum.nationstates.net/').replace('src="./', 'href="https://forum.nationstates.net/').replace('src="//', 'src="https://').replace('href="//', 'href="https://')
	dom = hp.fromstring(html)
	selector = 'div.pagination > span:last-child > a:last-child'
	return int(dom.cssselect(selector)[0].text_content())

def archive(item, page, userAgent):
	try:
		html = getMarkup(f'https://web.archive.org/save/{page}', userAgent)
	except RuntimeError as exc:
		raise RuntimeError("Archiving may have reached daily limits") from exc

# Get inputs
nsNationName = input('Enter your NS nation name for identification purposes: ')
userAgent = f'Script by The Ice States to save a Forum 7 thread. Run by {nsNationName}.'
threadLink = input('Enter thread link: ')
pageNo = getPageNo(threadLink, userAgent)
print(f'Identified {pageNo} pages.')

# Loop through thread
tries = 0
item = int(input('Enter starting page index (zero-based): '))
originalTime = time.time() - 20;
while item < pageNo:
	try:	
		# Wait to avoid violating NS rate limits
		if time.time() < originalTime + 20:
			time.sleep(originalTime + 20 - time.time())
		
		# Fetch page HTML
		print('Delay since last request: ' + str(time.time() - originalTime) + ' s. Fetching page ' + str(item) + '...')
		pageLinkFragment = '&start=' + str(item * 25) if item != 0 else ''
		page = threadLink + pageLinkFragment
		originalTime = time.time()
		archive(item, page, userAgent)
		
		tries = 0
		item += 1
	except:
		# Move on to next page after three attempts at the same page
		tries += 1
		if tries == 3:
			item += 1
			print('Unable to save page ' + str(item + 1) + '.')
		elif tries == 5:
			# After five consecutive failures raise error
			raise
		else:
			print('Unable to save page ' + str(item + 1) + '. Trying again...')
		# Space consecutive attempts
		time.sleep(20)
