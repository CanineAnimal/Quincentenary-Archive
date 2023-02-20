console.log('%cWARNING', 'color:red; font-size:100px');
console.log('%cInputting code into here may break the site, or possibly hack your computer! This feature is intended only for developers -- do NOT copy paste text here if you are not certain what you are doing.', 'font-size: 20px');
function accessArchive(ext){
	var num;
	for(var item = 0; item < document.querySelectorAll('BUTTON').length; item++){
		if(document.querySelectorAll('BUTTON')[num] == event.target){
			num = item;
			break;
		}
	}if(ext == '.html'){
		document.querySelector('#IFRAME_SPACE').innerHTML = '<IFRAME SRC="https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + document.querySelectorAll('INPUT')[num].id + '/' + (eval(document.querySelectorAll('INPUT')[num].value) - 1) + ext + '" TITLE="Archive" WIDTH="600px" HEIGHT="600px"/>';
	}else if(ext == '.pdf'){
		document.querySelector('#IFRAME_SPACE').innerHTML = '<IFRAME SRC="https://cdn.jsdelivr.net/gh/CanineAnimal/QA-Archives/' + document.querySelectorAll('INPUT')[num].id + '/' + (eval(document.querySelectorAll('INPUT')[num].value) - 1) + ext + '" TITLE="Archive" WIDTH="600px" HEIGHT="600px"/>';
	}
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A> | <A HREF="#" ONCLICK="closeIframe()">Close archive</A>';
}
function closeIframe(){
	document.querySelector('#IFRAME_SPACE').innerHTML = '';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A>';
}
