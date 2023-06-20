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
