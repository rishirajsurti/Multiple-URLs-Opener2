/*document.addEventListener('DOMContentLoaded', function () {
	//load the sites

	load();
});*/

/*$(document).ready(function(){
 	load();
 });*/

chrome.browserAction.onClicked.addListener(function(tab) { 
	//alert("load");
	load();
});

//enter your sites here
var setOne = [
"mail.google.com/mail/u/0/#inbox",
"mail.google.com/mail/u/1/#inbox",
"mail.google.com/mail/u/2/#inbox"
]


//format for new set
/*
var newSetName = [
"",
"",
""
]
*/
//now add a snippet in the load() function

function load() {
	var newWindow;

	var uri = new URI("");
	var currentUrl = '';
	
	//Set One
	//for first link of first set;
	uri = URI(setOne[0]);
	uri.normalize();
	if(uri.scheme()==''){currentUrl = 'http://'+uri.href();}
	else{currentUrl=uri.href();}

	//for rest of the links of set
	chrome.windows.create({url : currentUrl},function(win){	
								newWindow = win;
								loadSet(newWindow, setOne);
							} );


	
	//Format for new set

/*	//for first link of next set;	
	uri = URI(newSetName[0]); //NOTICE CHANGES HERE
	uri.normalize();
	if(uri.scheme()==''){currentUrl = 'http://'+uri.href();}
	else{currentUrl=uri.href();}

	//for rest of the links of set
	chrome.windows.create({url : currentUrl},function(win){	
								newWindow = win;				
								loadSet(newWindow, newSetName);
							} );*/ //NOTICE CHANGES HERE
}


function loadSet(currentWindow, urlSet) {

	var uri = new URI("");
	var currentUrl = '';
	
	for(var i = 1; i < urlSet.length; i++){
		
		uri = URI(urlSet[i]);
		uri.normalize();
		if(uri.scheme()==''){currentUrl = 'http://'+uri.href();}
		else{currentUrl=uri.href();}
			
		chrome.tabs.create({url: currentUrl, selected: false, "windowId":currentWindow.id}); 		
	}	
}
