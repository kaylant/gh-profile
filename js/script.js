// console.log($)
// var key = '?access_token=dd41997d9a91b6167e894d9421ff014f810163e7'
var baseURL = 'https://api.github.com/users/'
var profileURL = baseURL + 'kaylant'
var repoURL = profileURL + '/repos'

var profileContainer = document.querySelector('#profileFromJS')
var repoContainer = document.querySelector('#repoFromJS')
var inputEl = document.querySelector("input")
	// inputEl.placeholder = "Search GitHub User"

var githubApiPromise = function(someURL){
	return $.getJSON(someURL) //return the executed promise
}

// array to HTML
var generateAllReposHTML = function(jsonData) { 
	var repoArray = jsonData
	var totalHtmlString = ''
	for(var i = 0; i < repoArray.length; i++){
	    var oneRepo = repoArray[i]
	    // console.log(oneRepo) 
	    totalHtmlString += generateRepoHTML(oneRepo) 
	}
	repoContainer.innerHTML = totalHtmlString
}

// generate HTML
var generateProfileHTML = function(dataObj) {
	var htmlString = "<div class='profileStyle'>"
		htmlString +=    "<p> Name: " + dataObj.name + "</p>"
		htmlString += "</div>"
	profileContainer.innerHTML = htmlString
}

var generateRepoHTML = function(repoObj) {
	var htmlString =  "<div>"
	    htmlString +=    "<h3>" + repoObj.name + "</h3>"
	    htmlString += "</div>"
	return htmlString
}

//search 

var search = function(event) {
	var inputEl = event.target 
	if(event.keyCode === 13) {
		// alert("gross!")
		var userName = inputEl.value
		inputEl.value = ""
		location.hash = userName
	}	
}

var doSearch = function(userName){
	// alert("gross!")
    var profileURL = baseURL + userName 
    var userNamePromise = $.getJSON(profileURL)
    userNamePromise.then(generateProfileHTML)
    var repoURL = baseURL + userName + '/repos'
    var userRepoPromise = $.getJSON(repoURL)
    userRepoPromise.then(generateAllReposHTML)
}

var controller = function(){
    var userName = location.hash.substring(1)
    doSearch(userName)
}

inputEl.addEventListener('keydown',search)
window.addEventListener('hashchange',controller)

githubApiPromise(profileURL).then(generateProfileHTML)
githubApiPromise(repoURL).then(generateAllReposHTML)
