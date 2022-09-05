function accessArchive(num, ext){
	if(ext == '.html'){
		document.querySelector('#IFRAME_SPACE').innerHTML = '<IFRAME SRC="https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + document.querySelectorAll('INPUT')[num].id + '/' + (eval(document.querySelectorAll('INPUT')[num].value) - 1) + ext + '" TITLE="Archive" WIDTH="600px" HEIGHT="600px"/>';
	}else{
		document.querySelector('#IFRAME_SPACE').innerHTML = '<IFRAME SRC="https://cdn.jsdelivr.net/gh/CanineAnimal/QA-Archives@main/' + document.querySelectorAll('INPUT')[num].id + '/' + (eval(document.querySelectorAll('INPUT')[num].value) - 1) + ext + '" TITLE="Archive" WIDTH="600px" HEIGHT="600px"/>';
	}
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A> | <A HREF="#" ONCLICK="closeIframe()">Close archive</A>';
}
function closeIframe(){
	document.querySelector('#IFRAME_SPACE').innerHTML = '';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A>';
}
