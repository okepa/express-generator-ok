let fs = require("fs");
let path = require("path");

class FileSystem{
    /**
     * This function creates the template folders
     *
     * @param {String} programName
     * @param {Boolean} start
     */

    static createFolders(programName, start, folder){

        if (!fs.existsSync(programName) && start){

            fs.mkdirSync(programName);
            console.log("Created : " + programName.substring(1));

        } else if(!start) {

            fs.mkdirSync(programName + folder);
            console.log("Created : " + folder);                    
        }

        else{
            console.log("This project already exists");
        }
    }

    static loadFileTemplate(fileName) {
        return fs.readFileSync(path.join(__dirname, '..', 'templates', fileName), 'utf-8');
    }

    static createFileFromTemplates(programName, dir){
        fs.writeFileSync(programName, dir);
        console.log("Created : " + programName.substring(1));
    }

    static instructions(programName) {

        console.log("");
        console.log("cd %s and npm install", programName.substring(2));
        console.log("");
        console.log("Run the program using node app.js");
        console.log("");
    }
}

module.exports = FileSystem;
