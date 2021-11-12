//selecting div .overview where profile info will appear
const overview = document.querySelector(".overview"); 
// console.log(profileInfo); 

const username = "emilyebrooks"; 
// console.log(username); 

//async function fetching data from github API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json(); 
    console.log(userInfo);
    displayUserInfo(data); //calling the function that displays the fetched user info
};

gitUserInfo(); 

//Display fetched user information.
//Create a function that accepts the JSON data as a parameter
const displayUserInfo = function (data) {
    const div = document.createElement("div"); //creating new div
    div.classList.add(".user-info"); //giving div a class of "user-info"
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
};