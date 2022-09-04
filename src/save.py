# Dependencies: PdfKit, WkHtmlToPdf, GitPython
# https://pypi.org/project/pdfkit/
# https://wkhtmltopdf.org/
# https://gitpython.readthedocs.io/en/stable/
# Nb: this code is run in a clone of the QA-Archive repo.

# Get modules
import requests
import github
import pdfkit
import time
import git


# Get inputs
threadLink = input('Enter thread link: ')
pageNo = int(input('Enter the amount of pages: '))
tn = input('Enter shorthand version of thread name: ')
repo = git.Repo('.git')

# Loop through thread
item = 0
while item < pageNo:
	try:
		# Save page HTML
		print('Fetching ' + str(item ) + '.html...')
		page = threadLink + '&start=' + str(item * 25)
		html = requests.get(page, headers={'User-Agent': 'Script by The Ice States to save a Forum 7 thread.'}).text.replace('href="./', 'href="https://forum.nationstates.net/').replace('src="./', 'href="https://forum.nationstates.net/').replace('src="//', 'src="https://').replace('href="//', 'href="https://')
		print('Saving ' + str(item ) + '.html...')
		file = open(tn + '/' + str(item) + '.html', 'w', encoding='utf-8')
		file.write(html)
		file.close()
		time.sleep(1)
		print('Adding ' + str(item) + '.html...')
		repo.index.add([folder + '/' + str(item) + '.html'])
		print('Committing changes...')
		repo.index.commit('Upload HTML Page')
		print('Pushing changes...')
		origin = repo.remote(name='origin')
		origin.push()
		print('Uploaded page ' + str(item + 1) + ' in HTML!')
		time.sleep(1)

		# Save page PDF
		print('Saving ' + str(item) + '.pdf...')
		pdfkit.from_url(page, str(item) + '.pdf', options={'custom-header':[('User-Agent','Script by The Ice States to save a Forum 7 thread.')]})
		time.sleep(1)
		print('Adding ' + str(item) + '.pdf...')
		repo.index.add([folder + '/' + str(item) + '.pdf'])
		print('Committing changes...')
		repo.index.commit('Upload PDF Page')
		print('Pushing changes...')
		origin = repo.remote(name='origin')
		origin.push()
		print('Completed!')
		time.sleep(1)
		print('Uploaded page ' + str(item + 1) + ' in PDF!')
		item += 1
	except:
		print('Unable to save page ' + str(item))
