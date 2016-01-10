# Basic upload

Upload file easly, that's it !

## Requirement
You need to use the latest stable version of Node.js (4.2 or higher)

## How it works

The module deserve an **upload** function which use `Promise`.
The files are stored in the directory **uploads** at the top of your application.

## Example 
```js
const upload = require('basic-upload');

// assuming an express app
// don't forget to enable multipart/form-data 
app.post('/pictures/new', function(req, res) {
  const product = req.body.pictures;

  upload({
    file: req.files.picture,  // unique file
    files: req.files.gallery, // array of file
    parentDirectory: 'pictures', 
    dirname: product.ref
  })
    .then(filesUploaded => {
      Picture.create({
        path: filesUploaded[0].path,
        name: filesUploaded[0].fileName,
      })
        .then(() => {
          res.redirect('/');
        });
    })
    .catch(err => {
      console.error(err);
    })
});
```

## API

**function upload(params)**
params is an object who can hold :

- file: unique file
- files: array of files
- parentDirectory: name of the parent directory
- dirname : name of the directory where the files will be uploaded

The function resolve a filesUploaded variable which is an array of object who contain the filename and the path for each file.