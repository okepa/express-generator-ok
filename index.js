#!/usr/bin/env node
//require npms
const program = require ('commander');
const fs = require('fs');
const path = require('path');
//require function file
const fileSystem = require('./models/createFiles');
const jsonpkg = require('./package.json');
let version = jsonpkg.version;
//Arrays for the folders and files
const folderArray = ['/lib', '/routes', '/views', '/controllers', '/models', '/public', '/public/js', '/public/css', '/public/font', '/public/image'];
const rArray = ['/app.js', '/views/index.ejs', '/controllers/indexController.js', '/routes/routes.js', '/Procfile'];
let wArray = [];
//The commands from the command line
program
    .version(version, '    --version')
    .usage('-n <Project Name>')
    .option('-n, --name <name>', 'Project name' )
    .parse(process.argv);

//get the name of the directory
let programName = './' + program.name;

// Create the package.json
let pkg = {
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

//Create a directory with the name of the program
fileSystem.createFolders(programName, true)
    .then(() => {
        //create the express template folders
        return fileSystem.createFolders(programName, false, folderArray);
    })
    .then(() => {
        //Get the files I want to import from the templates folder using readFileSync
        return fileSystem.loadFileTemplate(rArray, wArray);
    })
    .then((wArray) => {
        //create files using writeFileSync
        return fileSystem.createFileFromTemplates(programName, rArray, wArray, false);
    })
    .then(() => {
        //create json file from the template
        return fileSystem.createFileFromTemplates(programName, '/package.json', JSON.stringify(pkg, null, 2) + '\n', true);
    })
    .then(() => {
        //print out instructions for what do do after ejs-o -n <name>
        return fileSystem.instructions(programName);
    })





