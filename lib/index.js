'use strict';

const fs     = require('fs');
const path   = require('path');
const mkdirp = require('mkdirp');
const async  = require('async');

module.exports = function(params) {
  const file            = params.file;
  const files           = params.files;
  const parentDirectory = params.parentDirectory
  const dirname         = params.dirname;
  const rootPath        = process.cwd();
  var filesInformations = [];

  return new Promise((resolve, reject) => {

    if (files) {
      const filesUploaded = files.filter(file => file.originalFilename !== '');

      async.each(filesUploaded, saveFile, err => {
        if (err) {
          console.error(error)
          reject(err);
        }
        else {
          resolve(filesInformations);
        }
      });
    }
    else {
      saveFile(file, () => {
        resolve(filesInformations[0]);
      });
    }
  });

  function saveFile(file, cb) {
    const filePath     = file.path;
    const ext          = path.extname(file.originalFilename);
    const fileName     = `${file.fieldName}-${Date.now()}${ext}`;
    const dirPath      = path.join(rootPath, `uploads/${parentDirectory}/${dirname}`);
    const fileDestPath = path.join(rootPath, `uploads/${parentDirectory}/${dirname}/${fileName}`);

    mkdirp(dirPath, err => {
      if (err) {
        console.error(err);
      }
      else {
        const stream$ = fs.createReadStream(filePath).pipe(fs.createWriteStream(fileDestPath));

        stream$.on('finish', () => {
          filesInformations.push({
            fileName,
            path: fileDestPath,
          });
          cb();
        });
      }
    });
  }

};


