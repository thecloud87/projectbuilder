#!/usr/bin/env node

'use strict';
console.log('Project file generator script');

const ProjectBuilder = require('./projectbuilder.js').ProjectBuilder;
//const constants = require('./pet-constants.js');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const elementName = args[0];
if (!elementName) {
  /*
   * Terminate program execution if the element's name is not provided.
   */
  console.error('PET Builder requires a Polymer element name to run.');
  process.exit();
}

let targetDirectory = args[1];

if (targetDirectory) {
  if (!fs.existsSync(targetDirectory)) {
	fs.mkdirSync(targetDirectory);
  }
} else {
  // If no target directory is provided, use this directory.
  targetDirectory = '.';
}


// 1. Fetch template modules.
//const TEMPLATE_PATH = constants.TEMPLATE_PATH;
const TEMPLATE_PATH = 'templates';
const templateFiles = fs.readdirSync(TEMPLATE_PATH).filter(function(templateFile) {
	return (templateFile[0] != '.');
});
const templateModules = templateFiles.map((fileName) => {
  const modulePath = path.join('./', TEMPLATE_PATH, fileName);
  console.log('Template file name: ', modulePath);
  return require('./' + modulePath);
});

// 2. Bind template variables to instances of templates.
const builder = new ProjectBuilder(elementName);
const fileModels = builder.getFiles(templateModules);


console.log(fileModels.map(
      (file) => `${file.fileName}: ${file.fileContent}`).join('\n\n'));

fileModels.forEach((fileObj) => {
	fs.writeFileSync(targetDirectory + '/' + fileObj.fileName, fileObj.fileContent);
});

