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
    file: req.files.picture, 
    parentDirectory: 'pictures', 
    dirname: product.ref
  })
    .then(filesUploaded => {
      
    })
    .catch(err => {
      console.error(err);
    })
});
```