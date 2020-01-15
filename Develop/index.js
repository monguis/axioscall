const generateHTML = require("./generateHTML");
const colorRef = ["green", "blue", "pink", "red"];
const questions = [];

function writeToFile(fileName, data) {

}

function init() {
    const fs = require("fs");
    const axios = require("axios");
    const inquirer = require("inquirer");

    inquirer
        .prompt([{
            type: "input",
            message: "Enter your GitHub username",
            name: "username"
        },
        {
            type: "list",
            message: "what is your preferred method of communication",
            name: "chosenColor",
            choices: colorRef
        }])
        .then(function (answer) {
            
            const queryUrl = `https://api.github.com/users/${answer.username}`;
            console.log(queryUrl)
            axios.get(queryUrl).then(function (data) {
                console.log(data.data.login)
                console.log(data.data.avatar_url)
                console.log(data.data.bio)
                console.log(data.data.public_repos);
                console.log(data.data.followers);
                console.log(data.data.following);
                console.log(data.data.location);
                console.log(data.data.blog);

            });

        });
}

init();

// Auxpbjstructure = {
//     profileImage,
//     username,
//     links: [location, GitHubprofile, blog],
//     bio,
//     repos,
//     followers
//     , githubStars,
//     usersFollowing
// }

