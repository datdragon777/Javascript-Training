# JAVASCRIPT BIG PRACTICE #

## Description: ##
- Website to manage jobs that need to be recruited with basic features

## Targets: ##
- Apply knowledge of HTML5/CSS3/JavaScript (with ES6 syntax).
- Understand and apply MVC pattern
- Understand and apply DOM manipulation, form validation.
- Use DevTools for debugging issues
- Use JSON server to manage the data
- Deploy to the hosting

## Design on figma: ##
[Figma](https://www.figma.com/file/956iRedkZ2dyc8zaC5UyzJ/Free-HR-Management-Dashboard-UI-Kit-(Community)?node-id=0%3A1&mode=dev)

## Requirments: ##
[Link](https://docs.google.com/document/d/1LQBzvdZADZi4jeqBcISl957o7EWoNlI1t7eGpapZQMc/edit?usp=sharing)

## Deploy: ##
[Here](https://javascript-training.vercel.app/)

## Information: ##
- Time line: 27/06/2023 -> 28/07/2023
- Editor: Visual Studio Code
- Supported browser: Chrome lasted

## Environments: ##
- Node: v18.16.0
- Parcel: v2.9.3

## Folder structure ##
big-practice
~~~
|-- src
    |-- assets
        |-- fonts
            |-- ...
        |-- images
            |-- ...
    |-- scripts
        |-- constants
            |-- base-url.js
        |-- controllers
            |-- job.js
        |-- helpers
            |-- message.js
            |-- ui-control.js
            |-- validation.js
        |-- models
            |-- job.js
        |-- services
            |-- job.js
        |-- templates
            |-- template.js
        |-- view
            |-- jobs.js
        |-- index.js
    |-- styles
        |-- abtracts
            |-- all.css
            |-- typography.css
            |-- variables.css
        |-- bases
            |-- all.css
            |-- base.css
            |-- reset.css
        |-- components
            |-- all.css
            |-- button.css
            |-- card.css
            |-- container.css
            |-- heading.css
            |-- input.css
            |-- header-bar.css
            |-- side-bar.css
        |-- contents
            |-- all.css
            |-- form-content.css
            |-- list-content.css
            |-- main-content.css
        |-- index.css
    |-- index.html
|-- .editorconfig
|-- .eslintrc.js
|-- .gitignore
|-- package.json
|-- README.md
~~~


## Getting started:
- Step 01: Clone repository with HTTPS:
~~~
git clone https://github.com/datdragon777/Javascript-Training.git
~~~
- Step 02: Move to folder which just cloned in your computer:
~~~
cd Javascript-Training
~~~
- Step 03: Change to branch feature/big-practice:
~~~
git checkout feature/big-practice
~~~
- Step 04: Next open folder big-practice
~~~
cd big-practice
~~~
- Step 05: Install Json-server
~~~
npm i -g json-server
~~~
- Step 06: Open terminal and type:
~~~
npm install
~~~
- Step 07: Run json-server:
~~~
json-server json-server/db.json
~~~
- Step 08: Open new terminal while old terminal is still running and finally run with:
~~~
npm start
~~~
