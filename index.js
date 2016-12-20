#!/usr/bin/env node
//require npms
let program = require ('commander');
let fs = require('fs');
let path = require('path');
let pkg = require('./package.json');
//require function file
let fileSystem = require('./models/createFiles');

//Arrays for the folders and files
let folderArray = ['/lib', '/routes', '/views', '/controllers', '/models', '/public', '/public/js', '/public/css', '/public/font', '/public/image'];
let rArray = ['/app.js', '/views/index.ejs', '/controllers/indexController.js', '/routes/routes.js', '/Procfile'];
let wArray = [];
program
    .usage('<Project Name>')
    .option('-n, --name [name]', 'Project name' )
    .parse(process.argv);

//get the name of the directory
let programName = './' + program.name;

//Create a directory with the name of the program
fileSystem.createFolders(programName, true);

//create the express template folders
for(let i in folderArray){
    fileSystem.createFolders(programName, false, folderArray[i]);
}

//Get the files I want to import from the templates folder using readFileSync
for(let i in rArray){
    wArray[i] = fileSystem.loadFileTemplate(rArray[i]);
}

// Create the package.json
let package = {
    name: programName.substring(2)
    , version: '0.0.0'
    , scripts: {   
          "test": "echo \"Error: no test specified\" && exit 1" 
        }
    , dependencies: {
        "express": "^4.14.0",
        "body-parser": "^1.15.2",
        "ejs": "^2.5.5"
    }
}

//create files using writeFileSync
for(let i in rArray){
    for(let j in wArray){
        if(i == j){
            fileSystem.createFileFromTemplates(programName + rArray[i], wArray[j]);
        }
    }
}
fileSystem.createFileFromTemplates(programName + '/package.json', JSON.stringify(package, null, 2) + '\n');

//print out instructions for what do do after ejs-o -n <name>
fileSystem.instructions(programName);




