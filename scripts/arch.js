// Print console message
console.log('%cWARNING', 'color:red; font-size:100px');
console.log('%cInputting code into here may break the site, or possibly hack your computer! This feature is intended only for developers -- do NOT copy paste text here if you are not certain what you are doing.', 'font-size: 20px');

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
		document.querySelector('.THREADS').innerHTML += '<BR/>"' + threads[item].title + '" (OP: " threads[item].posts[0].posterName' + '; ' + Math.ceil(threads[item].posts.length/25) + '): Page <INPUT ID="' + threads[item].shorthand + '/>: <BUTTON ONCLICK="accessArchive()">GO!</BUTTON>';
	}
}

// Create function to close archive
function closeIframe(){
	document.querySelector('#IFRAME_SPACE').innerHTML = '';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A>';
}
