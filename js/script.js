// console.log($)
var key = '?access_token=dd41997d9a91b6167e894d9421ff014f810163e7'
var baseURL = 'https://api.github.com/users/kaylant'
var profileURL = baseURL + key
var repoURL = baseURL + '/repos' + key

var profileContainer = document.querySelector('#profileFromJS')
var repoContainer = document.querySelector('#repoFromJS')
var inputEl = document.querySelector("input")

// var formatURLparams = function(paramsObj) {
//     var paramString = ''
//  	for (var aKey in paramsObj) {
//         var val = paramsObj[aKey]
//         paramString += "&" + aKey + "=" + paramsObj[aKey]
//     }
//     return paramString.substr(1)
// }

// request data, pass to handleResults

// var profilePromise = $.getJSON(profileURL)
// 	console.log(profilePromise)
// 	profilePromise.then(handleResults) 

var githubApiPromise = function(someURL){
	return $.getJSON(someURL) //return the executed promise
}

// var repoPromise = function

// var randomUserPRomise = function(dataFromGithub){
// 	// code here to formuate url

// 	return $.getJSON(someURL)
// }

//array to HTML
var generateAllReposHTML = function(jsonData) { 
	var repoArray = jsonData
	var totalHtmlString = ''
	for(var i = 0; i < repoArray.length; i++){
	    var oneRepo = repoArray[i]
	    console.log(oneRepo) 
	    totalHtmlString += generateRepoHTML(oneRepo) 
	}

	repoContainer.innerHTML = totalHtmlString
}

// generate HTML
var generateProfileHTML = function(dataObj) {
	console.log(dataObj)
	var htmlString = "<div class='profileStyle'>"
		htmlString += "<p> Name: " + dataObj.name + "</p>"
		htmlString += "</div>"
	profileContainer.innerHTML = htmlString
}



var generateRepoHTML = function(repoObj) {
	var htmlString =  "<div>"
	    htmlString +=    "<h3>" + repoObj.name + "</h3>"
	    htmlString += "</div>"
	console.log(htmlString)
	return htmlString
}



githubApiPromise(profileURL).then(generateProfileHTML)
githubApiPromise(repoURL).then(generateAllReposHTML)

