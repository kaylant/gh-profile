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
	// console.log(dataObj)
	var htmlString = "<div class='nameLoginStyle'>"
		htmlString +=    "<img class='avatarImg' src='" + dataObj.avatar_url + "'/>"
		htmlString +=    "<h1 class='name'>" + dataObj.name + "</h1>"
		htmlString +=	 "<p class='login'>" + dataObj.login + "</p>"
		htmlString += "</div>"
		htmlString += "<div class='personalDetailsStyle'>"
		htmlString +=    "<p class='location'><span class='octicon octicon-location'></span>" + dataObj.location + "</p>"
		htmlString +=    "<p class='email'><span class='octicon octicon-mail'></span><a href='mailto:" + dataObj.email + "'>" + dataObj.email + "</a></p>"
		htmlString +=    "<p class='website'><span class='octicon octicon-link'></span><a href='" + dataObj.blog + "'>" + dataObj.blog + "</a></p>"
		htmlString +=    "<p class='joinedDate'><span class='octicon octicon-clock'></span>Joined on " + dataObj.created_at + "</p>"
		htmlString += "</div>"
		htmlString += "<div class='followsStyle'>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.followers + "</h3><span class='smallText'>Follower</span></div>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.public_gists + "</h3><span class='smallText'>Starred</span></div>"
		htmlString +=    "<div class='boxes'><h3>" + dataObj.following + "</h3><span class='smallText'>Following</span></div>"
		htmlString += "</div>"
	profileContainer.innerHTML = htmlString
}

var generateRepoHTML = function(repoObj) {
	console.log(repoObj)
	var htmlString =  "<div class='repoObjStyle'>"
	    htmlString +=    "<h2>" + repoObj.name + "</h2>"
	    htmlString +=    "<p class='description'>" + repoObj.description + "</p>"
	    htmlString +=    "<p class='updated'>Updated <time datetime='" + repoObj.updated_at + "'></time>" + repoObj.updated_at + "</p>"
	    htmlString +=    "<div class='listStatsStyle'>"
	    htmlString +=    	"<p class='language'>" + repoObj.language + "</p>"
	    htmlString +=    	"<p class='stats'><span class='octicon octicon-star'></span>" + repoObj.stargazers_count + "</p>"
	    htmlString +=    	"<p class='stats'><span class='octicon octicon-git-branch'></span>" + repoObj.forks_count + "</p>"
	    htmlString +=    "</div>"
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
