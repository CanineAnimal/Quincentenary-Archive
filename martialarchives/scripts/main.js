console.log('%cWARNING', 'color:red; font-size:100px');
console.log('%cInputting code into here may break the site, or possibly hack your computer! This feature is intended only for developers -- do NOT copy paste text here if you are not certain what you are doing.', 'font-size: 20px');
document.querySelector('#HTML_LINK').onclick = function(){
	location.href = 'https://canineanimal.github.io/Quincentenary-Archive/martialarchives/pages/html.html';
}
document.querySelector('#PDF_LINK').onclick = function(){
	location.href = 'https://canineanimal.github.io/Quincentenary-Archive/martialarchives/pages/pdf.html';
}
document.querySelector('#JSON_LINK').onclick = function(){
	location.href = 'https://canineanimal.github.io/Quincentenary-Archive/martialarchives/pages/martialrepositories.json';
}
function searchLink(){
	json = undefined;
	jsonArray = undefined;
	threadID = undefined;
	thread = undefined;
	postID = undefined;
	page = undefined;
	link = document.querySelector('#LINK_SEARCH').value;
	if(link.indexOf('forum.nationstates.net') == -1){
		alert('URL not to "forum.nationstates.net". Please try again.');
	}else{
		try{
			var request = new XMLHttpRequest();
			request.open('GET', 'https://canineanimal.github.io/Quincentenary-Archive/martialarchives/pages/martialrepositories.json', false);
			request.send();
			json = JSON.parse(request.responseText);
			jsonArray = Object.values(json);

			if(link.indexOf('t=') != -1){
				threadID = 't' + link.split('t=')[1].split('&')[0];
				for(var item = 0; item < jsonArray.length; item++){
					if(json[threadID] != undefined){
						thread = json[threadID].shorthand;
					}
				}
			}
			if(!(link.indexOf('p=') == -1 && link.indexOf('#p') == -1)){
				if(link.indexOf('#p') == -1){
					postID = link.split('p=')[1].split('#p')[0];
				}else{
					postID = link.split('#p')[1];
				}
				for(var item = 0; item < jsonArray.length; item++){
					for(var jtem = 0; jtem < jsonArray[item].posts.length; jtem++){
						if(jsonArray[item].posts[jtem].postID.split('p')[1] == postID){
							thread = jsonArray[item].shorthand;
							page = Math.floor(jtem/25);
						}
					}
				}
			}
			if(link.indexOf('start=') != -1){
				page = Math.floor(Number.parseInt(link.split('start=')[1].split('&')[0])/25);
			}
			if(window.thread == undefined){
				alert('Thread not found. Either your link is incorrect, or the link you entered is from a thread not saved in the HTML Archive.');
			}else{
				if(window.page == undefined){
					location.href = 'https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + thread + '/0.html';
				}else if(window.postID == undefined){
					location.href = 'https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + thread + '/' + page + '.html';
				}else{
					location.href = 'https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/' + thread + '/' + page + '.html#p' + postID;
				}
			}
		}catch(e){
			alert('Something went wrong. Most likely your link is incorrect; otherwise please try again later.')
		}
	}
}
