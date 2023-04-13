console.log('%cWARNING', 'color:red; font-size:100px');
console.log('%cInputting code into here may break the site, or possibly hack your computer! This feature is intended only for developers -- do NOT copy paste text here if you are not certain what you are doing.', 'font-size: 20px');
function closeIframe(){
	document.querySelector('#IFRAME_SPACE').innerHTML = '';
	document.querySelector('.LINKS').innerHTML = '<A HREF="https://canineanimal.github.io/Quincentenary-Archive/pages/">Back</A>';
}
