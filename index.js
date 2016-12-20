#!/usr/bin/env node
//require npms
let program = require ('commander');
let fs = require('fs');
let path = require('path');
let pkg = require('./package.json');

let fileSystem = require('./models/createFiles');

let folderArray = ['/lib', '/routes', '/views', '/controllers', '/models', '/public', '/public/js', '/public/css', '/public/font', '/public/image'];

let rArray = ['/app.js', '/views/index.ejs', '/controllers/indexController.js', '/routes/routes.js', '/Procfile'];

let wArray = [];
program
    .usage('[nameUsage]')
    .option('-n, --name [nam]', 'Project name' )
    .parse(process.argv);

//get the name of the directory
let programName = './' + program.name;

//Create a directory with the name of the program
fileSystem.createFolders(programName, true);

//create the express template folders
for(let i in folderArray){
    fileSystem.createFolders(programName, false, i);
}
// fileSystem.createFolders(programName, false, '/lib');
// fileSystem.createFolders(programName, false, '/routes');
// fileSystem.createFolders(programName, false, '/views');
// fileSystem.createFolders(programName, false, '/controllers');
// fileSystem.createFolders(programName, false, '/models');
// fileSystem.createFolders(programName, false, '/public');
// fileSystem.createFolders(programName, false, '/public/js');
// fileSystem.createFolders(programName, false, '/public/css');
// fileSystem.createFolders(programName, false, '/public/font');
// fileSystem.createFolders(programName, false, '/public/image');

//Get the files I want to import from the templates folder using readFileSync
for(let i in folderArray){

}
let app = fileSystem.loadFileTemplate('/app.js');
let index = fileSystem.loadFileTemplate('/views/index.ejs');
let indexController = fileSystem.loadFileTemplate('/controllers/indexController.js');
let routes = fileSystem.loadFileTemplate('/routes/routes.js');
let procFile = fileSystem.loadFileTemplate('/Procfile');

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
fileSystem.createFileFromTemplates(programName + '/Procfile', procFile);

fileSystem.createFileFromTemplates(programName + '/package.json', JSON.stringify(package, null, 2) + '\n');

//print out instructions for what do do after ejs-o -n <name>
fileSystem.instructions(programName);




