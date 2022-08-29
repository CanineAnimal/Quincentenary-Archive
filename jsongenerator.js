var pages = eval(prompt('How many pages does this thread have?'));
var parser = new DOMParser();
var request = new XMLHttpRequest();
request.open('GET', '0.html', false);
request.send();
json = {}
json['t'] + parser.parseFromString(request.responseText, 'text/html').querySelectorAll('A')[12].attributes.href.value.split('=')[2] + '":{lock:';
if(parser.parseFromString(request.responseText, 'text/html').querySelectorAll('.locked-icon').length == 0){
	json.lock = false;
}else{
	json.lock = true;
}
json.posts = [];
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
				timestamp: posts[jtem].querySelector('.author').innerText.split('» ')[1] + '",',
				postHTML: posts[jtem].querySelector('.content').innerHTML
			}
		}
	}else{
		json.posts[json.posts.length] = null;
	}
}
console.log(JSON.stringify(json) + ',');
