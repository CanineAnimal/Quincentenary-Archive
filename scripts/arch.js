// Print console message
console.log('%cWARNING', 'color:red; font-size:100px');
console.log('%cInputting code into here may break the site, or possibly hack your computer! This feature is intended only for developers -- do NOT copy paste text here if you are not certain what you are doing.', 'font-size: 20px');

// Define Web Components
customElements.define('thd-tg' /* Stupid hyphen requirement */, class extends HTMLElement{
	constructor(){
		super();
		var tmpt = document.querySelector('#THREAD').content;
		var sRoot = this.attachShadow({mode: 'open'});
		sRoot.appendChild(tmpt.cloneNode(true));
	}
});

// Add all archives to .ΤΗREADS
function loadThreads(url){
	var threads = 0;
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	try{request.send()}catch(e){};
	if(200 <= request.status && request.status <= 299){
		threads = Object.values(JSON.parse(request.responseText));
	}else{
		var request = new XMLHttpRequest();
		request.open('GET', url, false);
		try{request.send()}catch(e){};
		if(200 <= request.status && request.status <= 299){
			threads = Object.values(JSON.parse(request.responseText));
		}else{
			document.querySelector('.THREADS').innerHTML = '<BR/><SPAN CLASS="WARNING">Failed to load threads. Please try again later or check your internet connection</SPAN>';
		}
	}
	if(threads !== 0){
		document.querySelector('.THREADS').innerHTML = '';
		for(var item = 0; item < threads.length; item++){
			document.querySelector('.THREADS').innerHTML += '<THD-TG><SPAN SLOT="THREAD_NAME">' + threads[item].title + '</SPAN><SPAN SLOT="OP">' + threads[item].posts[0].posterName + '</SPAN><SPAN SLOT="PAGES">' + Math.ceil(threads[item].posts.length/25) + '</SPAN></THD-TG><INPUT ID="' + threads[item].shorthand + '"/>: <BUTTON ONCLICK="accessArchive()">GO!</BUTTON>';
		}
	}
}

// Create function to close archive
function closeIframe(){
	document.querySelector('#IFRAME_SPACE').innerHTML = '';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A>';
}
