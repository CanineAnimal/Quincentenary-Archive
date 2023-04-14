// Add all archives to .ΤΗREADS
var threads = 0;

var request = new XMLHttpRequest();
request.open('GET', 'https://canineanimal.github.io/Quincentenary-Archive/pages/quincentenaryarchive.json', false);
request.send();

if(200 <= request.status && request.status <= 299){
	threads = Object.values(JSON.parse(request.responseText));
}else{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://canineanimal.github.io/Quincentenary-Archive/pages/quincentenaryarchive.json', false);
	request.send();
	if(200 <= request.status && request.status <= 299){
		threads = Object.values(JSON.parse(request.responseText));
	}else{
		document.querySelector('.THREADS').innerHTML = '<BR/><SPAN CLASS="WARNING">Failed to load threads. Please try again later or check your internet connection</SPAN>';
	}
}
if(threads !== 0){
	for(var item = 0; item < threads.length; item++){
		document.querySelector('.THREADS').innerHTML += '<BR/>"' + threads[item].title + '" (OP: " threads[item].posts[0].posterName' + '; ' + Math.threads[item].posts.length/25 + '): Page <INPUT ID="' + Math.threads[item].shorthand + '/>: <BUTTON ONCLICK="accessArchive()">GO!</BUTTON>';
	}
}


function accessArchive(){
	var num;
	for(var item = 0; item < document.querySelectorAll('BUTTON').length; item++){
		if(document.querySelectorAll('BUTTON')[item] == event.target){
			num = item;
			break;
		}
	}
	document.querySelector('#IFRAME_SPACE').innerHTML = '<IFRAME SRC="https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + document.querySelectorAll('INPUT')[num].id + '/' + (eval(document.querySelectorAll('INPUT')[num].value) - 1) + '.html" TITLE="Archive" WIDTH="600px" HEIGHT="600px"/>';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A> | <A HREF="#" ONCLICK="closeIframe()">Close archive</A>';
}
