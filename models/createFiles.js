let fs = require("fs");
let path = require("path");

class FileSystem{

    /**
     * This function creates the folders for the project
     *
     * @param {String} programName
     * @param {Boolean} start
     * @param {Array} folderArray
     */

    static createFolders(programName, start, folderArray){
        return new Promise(
            (resolve, reject) => {
                if(!fs.existsSync(programName) && start){
                    fs.mkdirSync(programName);
                    console.log("Created : " + programName.substring(1));    
                    resolve();                
                }
                else if(!start){
                    for(let i in folderArray){
                        fs.mkdirSync(programName + folderArray[i]);
                        console.log("Created : " + programName.substring(1) + folderArray[i]);  
                    }
                    resolve();                       
                } else {
                     console.log("This project already exists");
                     reject();
                }
                
            }
        )
    }

    /**
     * This function read the files from the template
     *
     * @param {Array} rArray
     * @param {Array} wArray
     */

    static loadFileTemplate(rArray, wArray){
        return new Promise(
            (resolve) => {
                for(let i in rArray){
                    wArray[i] = fs.readFileSync(path.join(__dirname, '..', 'templates', rArray[i]), 'utf-8');
                }
                resolve(wArray);
            }
        )
    }

    /**
     * This function creates the files that where read from the template
     *
     * @param {String} programName
     * @param {Array} programName2
     * @param {Array} wArray
     * @param {Boolean} jsonfile
     */

    static createFileFromTemplates(programName, programName2, dir, jsonfile){
        return new Promise(
            (resolve) => {
                if(!jsonfile)
                {
                    for(let i in programName2){
                        for(let j in dir){
                            if(i == j){
                                fs.writeFileSync(programName + programName2[i], dir[j]);
                                let name = programName + programName2[i];
                                console.log("Created : " + name.substring(1)); 
                            }
                        }           
                    }
                    resolve();
                }
                else{
                    fs.writeFileSync(programName + programName2, dir);
                    resolve();
                }
            }
        )
    }

    /**
     * This function displays the instructions to the program
     *
     * @param {String} programName
     */

    static instructions(programName){
        return new Promise(
            (resolve) => {
                console.log("");
                console.log("Instructions: cd %s", programName.substring(2));
                console.log("");
                console.log("Instructions: npm install");
                console.log("");
                console.log("Instructions: Run the program using node app.js");
                console.log("");
                resolve();
            }
        )
    }
}

module.exports = FileSystem;
