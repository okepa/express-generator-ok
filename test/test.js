//require npms
let fs = require('fs');
let path = require('path');
//require chai for testing
let chai = require('chai');
chai.use(require('chai-fs'));
const should = chai.should();
const expect = require('chai').expect;
const assert = require('chai').assert;
//require function file
let fileSystem = require('../models/createFiles');

describe("Check if folders and files are created", () => {
    
    let programName = "./testFolder";
    let route = path.join(__dirname, '..', programName);
    let controllers = "/controllers";
    let folderArray = ["/controllers"]; 
    rArray = ['/controllers/indexController.js'];
    wArray = [];

    it("The first folder exists", (done) => {
        fileSystem.createFolders(programName, true, '')
            .then(() => {
                assert.isDirectory(route,  "The directory was created");
                done();
            });
    });
    it("The rest of the folders should exist", (done) => {
        fileSystem.createFolders(programName, false, folderArray)
            .then(() => {
                assert.isDirectory(route + controllers, "The directory was created");
                done();
            });
    });
    it("The file should be copied from the template folders", (done) => {
        fileSystem.loadFileTemplate(rArray, wArray)
        .then(() => {
            assert.isNotNull(wArray, "The array wasn't null");
            assert.isArray(wArray, 'An array was returned');
            done();
        });
    });
    it("The file copied from teh template folder should be created", (done) => {
        fileSystem.createFileFromTemplates(programName, rArray, wArray, false)
        .then(() => {
            assert.isFile(route + rArray, "The file was created");
            done();
        });
    });
})




