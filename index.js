#!/usr/bin/env node
//require npms
let program = require ('commander');
let fs = require('fs');
let path = require('path');
let pkg = require('./package.json');

let fileSystem = require('./models/createFiles');

program
    .usage('[nameUsage]', '[dir]')
    .option('-n, --name [nam]', 'Project name' )
    .parse(process.argv);

//get the name of the directory
let programName = './' + program.name;

//Create a directory with the name of the program
fileSystem.createFolders(programName, true);

//create the express template folders
fileSystem.createFolders(programName, false, '/lib');
fileSystem.createFolders(programName, false, '/routes');
fileSystem.createFolders(programName, false, '/views');
fileSystem.createFolders(programName, false, '/controllers');
fileSystem.createFolders(programName, false, '/models');
fileSystem.createFolders(programName, false, '/public');
fileSystem.createFolders(programName, false, '/public/js');
fileSystem.createFolders(programName, false, '/public/css');
fileSystem.createFolders(programName, false, '/public/font');
fileSystem.createFolders(programName, false, '/public/image');

//Get the files I want to import from the templates folder using readFileSync
let app = fileSystem.loadFileTemplate('/app.js');
let index = fileSystem.loadFileTemplate('/views/index.ejs');
let indexController = fileSystem.loadFileTemplate('/controllers/indexController.js');
let routes = fileSystem.loadFileTemplate('/routes/routes.js');
let jquery = fileSystem.loadFileTemplate('/public/js/jquery-3.1.1.min.js');
let jsNonMinified = fileSystem.loadFileTemplate('/public/js/materialize.js');
let jsMinified = fileSystem.loadFileTemplate('/public/js/materialize.min.js');
let cssNonMinified = fileSystem.loadFileTemplate('/public/css/materialize.css');
let cssMinified = fileSystem.loadFileTemplate('/public/css/materialize.min.css');


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
fileSystem.createFileFromTemplates(programName + '/app.js', app);
fileSystem.createFileFromTemplates(programName + '/views/index.ejs', index);
fileSystem.createFileFromTemplates(programName + '/controllers/indexController.js', indexController);
fileSystem.createFileFromTemplates(programName + '/routes/routes.js', routes);
fileSystem.createFileFromTemplates(programName + '/public/js/jquery-3.1.1.min.js', jquery);
fileSystem.createFileFromTemplates(programName + '/public/js/materialize.js', jsNonMinified);
fileSystem.createFileFromTemplates(programName + '/public/js/materialize.min.js', jsMinified);
fileSystem.createFileFromTemplates(programName + '/public/css/materialize.css', cssNonMinified);
fileSystem.createFileFromTemplates(programName + '/public/css/materialize.min.css', cssMinified);

fileSystem.createFileFromTemplates(programName + '/package.json', JSON.stringify(package, null, 2) + '\n');

//print out instructions for what do do after ejs-o
fileSystem.instructions(programName);




