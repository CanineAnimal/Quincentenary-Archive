// This should be ran on any HTML archive version of a page on a thread. Nb generated code should be appended to existing JSON archive prior to the closing } bracket.
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
			rd = posts[jtem].querySelector('.author').innerText.split('» ')[1].split(' ');
			json.posts[json.posts.length] = {
				posterID: posts[jtem].querySelectorAll('A')[1].attributes.href.value.split('=')[2],
				posterName: posts[jtem].querySelector('.author').querySelector('Strong a').innerHTML,
				postID: posts[jtem].querySelector('.author').querySelector('a').href.split('#')[1],
				timestamp: new Date(eval(rd.split(rd[3])), months.indexOf(rd[1]), eval(rd[2]).split(',')[0], eval(rd[4]).split(':')[0], eval(rd[4]).split(':')[1])
				postHTML: posts[jtem].querySelector('.content').innerHTML
			}
		}
	}else{
		json.posts[json.posts.length] = null;
	}
}
document.body.innerHTML = '<TEXTAREA></TEXTAREA>';
document.querySelector('TEXTAREA').innerText = '"t' + threadID + '":' + JSON.stringify(json) + ',';
