// console.log($)
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
	console.log(dataObj)
	var htmlString = "<div class='nameLoginStyle'>"
		htmlString +=    "<img class='avatarImg' src='" + dataObj.avatar_url + "'/>"
		htmlString +=    "<h1 class='name'>" + dataObj.name + "</h1>"
		htmlString +=	 "<p class='login'>" + dataObj.login + "</p>"
		htmlString += "</div>"
		htmlString += "<div class='personalDetailsStyle'>"
		htmlString +=    "<p class='location' class='octicon octicon-location'>" + dataObj.location + "</p>"
		htmlString +=    "<p class='email'><a href='mailto:" + dataObj.email + "'>" + dataObj.email + "</a></p>"
		htmlString +=    "<p class='website'><a href='" + dataObj.blog + "'>" + dataObj.blog + "</a></p>"
		htmlString +=    "<p class='joinedDate'>Joined on " + dataObj.created_at + "</p>"
		htmlString += "</div>"
		htmlString += "<div class='followsStyle'>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.followers + "</h3></div>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.public_gists + "</h3></div>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.following + "</h3></div>"
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
