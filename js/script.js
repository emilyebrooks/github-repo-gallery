//selecting div .overview where profile info will appear
const overview = document.querySelector(".overview"); 
// console.log(profileInfo); 

const username = "emilyebrooks"; 
// console.log(username); 

//Select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

//async function fetching data from github API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json(); 
    // console.log(userInfo);
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
    // console.log(fetchRepo);
    displayRepos(repoData); 
};

// gitRepos(); 

//Display fetched info on repos
//repos is the parameter so the function accepts the data returned from the last fetchRepo API
const displayRepos = function (repos) {
    //loop and create a list item for each repo
    for (const repo of repos) {
        const repoItem = document.createElement("li"); //create a list
        repoItem.classList.add("repo"); //give each repo item the class of repo
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; //give each repo an h3 with the repo name
        repoList.append(repoItem); //append the list item to the global variable that selects the unordered repos list
    }
};
