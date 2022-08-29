// This should be ran on any HTML archive version of a page on a thread. Nb generated code should be appended to existing JSON archive prior to the closing } bracket.
var months = [,'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var pmify = ['am',,,,,,,,,,,,'pm'];
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
function twoDigitify(num){
	if(num.length == 1){
		return '0' + num.toString();
	}else{
		return num.toString();
	}
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
				timestamp: new Date(rd[3] + '-' + twoDigitify(months.indexOf(rd[1])) + '-' + rd[2].split(',')[0] + 'T' + twoDigitify(eval(rd[4].split(':')[0]) + pmify.indexOf(rd[5])) + ':' + twoDigitify(rd[4].split(':')[1]) + ':00.000-07:00'),
				postHTML: posts[jtem].querySelector('.content').innerHTML
			}
		}
	}else{
		json.posts[json.posts.length] = null;
	}
}
document.body.innerHTML = '<TEXTAREA></TEXTAREA>';
document.querySelector('TEXTAREA').innerText = '"t' + threadID + '":' + JSON.stringify(json) + ',';
