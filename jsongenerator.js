// This should be ran on any HTML page of a thread as archived.
var pages = eval(prompt('How many pages does this thread have?'));
var parser = new DOMParser();
var request = new XMLHttpRequest();
request.open('GET', '0.html', false);
request.send();
json = {}
if(parser.parseFromString(request.responseText, 'text/html').querySelectorAll('.locked-icon').length == 0){
	json.lock = false;
}else{
	json.lock = true;
}
json.title = document.querySelector('#page-body h2 a').innerText;
json.posts = [];
threadID = document.querySelectorAll('A')[12].attributes.href.value.split('=')[2];
for(var item = 0; item < pages; item++){
	var request = new XMLHttpRequest();
	request.open('GET', item + '.html', false);
	request.send();
	if(request.status == 200){
		posts = parser.parseFromString(request.responseText, 'text/html').querySelectorAll('.post');
		for(var jtem = 0; jtem < posts.length; jtem++){
			json.posts[json.posts.length] = {
				posterID: posts[jtem].querySelectorAll('A')[1].attributes.href.value.split('=')[2],
				posterName: posts[jtem].querySelector('.author').querySelector('Strong a').innerHTML,
				postID: posts[jtem].querySelector('.author').querySelector('a').href.split('#')[1],
				timestamp: posts[jtem].querySelector('.author').innerText.split('» ')[1],
				postHTML: posts[jtem].querySelector('.content').innerHTML
			}
		}
	}else{
		json.posts[json.posts.length] = null;
	}
}
document.body.innerHTML = '<TEXTAREA></TEXTAREA>';
document.querySelector('TEXTAREA').innerText = '"t' + threadID + '":' + JSON.stringify(json) + ',';
