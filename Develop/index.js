const generateHTML = require("./generateHTML");
const colorRef = ["green", "blue", "pink", "red"];
const questions = [];

const fs = require("fs");
const convertFactory = require('electron-html-to');
const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

//////////////////////////////////////////////////////////
function init() {
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
            message: "Please choose the color for your desire resume",
            name: "chosenColor",
            choices: colorRef
        }])
        .then(function ({username,chosenColor}) {

            const queryUrl = `https://api.github.com/users/${username}`;
            console.log(queryUrl)
            axios.get(queryUrl).then(function ({data}) {
                console.log(data)
                const parameter = {
                    name: data.name,
                    url:data.html_url,
                    login: data.login,
                    profilePicture: data.avatar_url,
                    bio: data.bio,
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    location: data.location,
                    blogLink: data.blog,
                    color: colorRef.indexOf(chosenColor),
                    company: data.company
                }
                let htmlcode = generateHTML.pdfGen(parameter);
                console.log(htmlcode);
                conversion({ html: htmlcode }, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream(`${data.login}.pdf`));
                    conversion.kill();
                });

            });

        });



}

init();

