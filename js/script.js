//selecting div .overview where profile info will appear
const overview = document.querySelector(".overview"); 
// console.log(profileInfo); 

const username = "emilyebrooks"; 
// console.log(username); 

//Select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

//Select the section with class of "repos" where all repo info appears
const allReposContainer = document.querySelector(".repos"); 

//Select the section with class of "repo-data" where individual repo data appears
const repoData = document.querySelector(".repo-data");  
//????CURIOUS HOW WE CAN NAME THIS REPO DATA WHEN WE HAVE A REPODATA VAR IN THE GITREPOS ASYNC FUNCTION
//AWAITING GUIDANCE FROM SLACK

//Select Back To Repo Button
const backButton = document.querySelector(".view-repos"); 

//Select input with Search by Name placeholder
const filterInput = document.querySelector(".filter-repos");

//async function fetching data from github API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json(); 
    // console.log(data);
    displayUserInfo(data); //calling the function that displays the fetched user info
};

gitUserInfo(); 

//Display fetched user information.
//Create a function that accepts the JSON data as a parameter
const displayUserInfo = function (data) {
    const div = document.createElement("div"); //creating new div
    div.classList.add("user-info"); //giving div a class of "user-info"
    //adding figure, image and paragraphs to the new div
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div); //appending the new div to the overview element
    gitRepos(); 
};

//Async function to fetch data about users repos
//API parameters call for displaying by most recent updated, up to a max of 100 per page
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json(); 
    // console.log(repoData);
    displayRepos(repoData); 
};

// gitRepos(); 

//Display fetched info on repos
//repos is the parameter so the function accepts the data returned from the last fetchRepo API
const displayRepos = function (repos) {
    filterInput.classList.remove("hide"); 
    //loop and create a list item for each repo
    for (const repo of repos) {
        const repoItem = document.createElement("li"); //create a list
        repoItem.classList.add("repo"); //give each repo item the class of repo
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; //give each repo an h3 with the repo name
        repoList.append(repoItem); //append the list item to the global variable that selects the unordered repos list
    }
};

//add event listener to unordered list with class of "repo-list", pass event e in callback function
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {//check if event target (element that was click on) matches the ,h3> element
        const repoName = e.target.innerText; //var to target innerText where event happens
        getRepoInfo(repoName);
    }
});

//create async function to get specific repo info that accepts repoName as parameter
const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
    const repoInfo = await fetchInfo.json(); 
    console.log(repoInfo); 

    //To grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json(); 
    // console.log(languageData); 

    //make a list of languages
    const languages = []; 
    for (const language in languageData) {
    languages.push(language); 
    }
    // console.log(languages); 
    
    displayRepoInfo(repoInfo, languages); //calls the displayRepoInfo function 
}; 

//Create function to display specific repo information
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = ""; 
    repoData.classList.remove("hide"); //Unhide the repo data element
    allReposContainer.classList.add("hide"); //Hide the element with the class of repos
    backButton.classList.remove("hide"); //show the back button when clicked
    const div = document.createElement("div"); //creating new div
    div.classList.add("repo-data"); 
    div.innerHTML = ` 
    <h3>Name:${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div); 
}; 

//Create event listener for when user clicks on back to repos button
backButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide"); //show or unhide the list of all repos
    repoData.classList.add("hide"); //remove or hide the individual repo data
    backButton.classList.add("hide"); //remove or hide the back button when clicked
}); 

//Dynamic Search
//Create an "input" event listener for the filterInput field
filterInput.addEventListener("input", function(e) { //pass the (e) in the callback function
    const searchText = e.target.value; //capture the value of the search text
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo"); //create var to select ALL elements with class of "repo"
    const searchLowerText = searchText.toLowerCase(); //

    for (const repo of repos) {//loop through each repo inside the repos element
        const repoLowerText = repo.innerText.toLowerCase(); //assign var to lowercase value of the innerText of each repo
        if (repoLowerText.includes(searchLowerText)) { //Check to see if lowercase repo includes lowercase text. 
            repo.classList.remove("hide"); //If the repoLowerText includes lowercase search text, show the repo
        } else {
            repo.classList.add("hide"); //If it doesn't include lowercase search text, hide the repo. 
        }
    }
});


