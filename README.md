`express-fileforge` is a file upload utility for Express.js that simplifies file handling. It provides a convenient way to save files to the server and manage file storage paths. This package is designed to be easy to use and integrate seamlessly with your Express.js applications.

```bash
npm install express-fileforge
```

```javascript
const express = require('express');
const fileForge = require('express-fileforge'); // Make sure deleteFile is exported from here
const path = require('path');
const app = express();

// Your route for file upload
app.post('/upload', async function (req, res) {
    try {
        // Set up file storage directory
        const fileStoragePath = path.resolve(__dirname, 'myFiles');
        // Save the uploaded file
        let uploadedFile = await fileForge.saveFile(req, fileStoragePath, 'abc.pdf');

        res.end(`File uploaded successfully: ${uploadedFile}`);
    } catch (error) {
        console.error(error);
        res.status(500).end('Internal Server Error');
    }
});

// Route for file deletion
app.delete('/delete/:fileName', async function (req, res) {
    try {
        // Set up file storage directory
        const fileStoragePath = path.resolve(__dirname, 'myFiles');
        // File name from the URL parameter
        const fileName = req.params.fileName;

        // Delete the specified file
        const isDeleted = await fileForge.deleteFile(fileStoragePath, '', fileName);
        if (isDeleted) {
            res.end(`File deleted successfully: ${fileName}`);
        } else {
            res.status(404).end(`File not found: ${fileName}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).end('Internal Server Error');
    }
});

// Start the server
app.listen(5050, function () {
    console.log('Server Run Success');
});

```


## How To Upload Using Fetch 
```javascript
async function uploadFile() {
  try {
    var formdata = new FormData();
    formdata.append("files", fileInput.files[0]);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    const response = await fetch("http://localhost:5050/uploads", requestOptions);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.log('error', error);
  }
}

// Call the function
uploadFile();

```



## How To Upload Using Axios
```javascript
async function uploadFile() {
    try {
        const formData = new FormData();
        formData.append("files", fileInput.files[0]);

        const response = await axios.post("http://localhost:5050/uploads", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function
uploadFile();

```

## Configuration Options

- `fileForge.saveFile(req, storagePath, fileName)`: Save the uploaded file to the specified storage path with the given filename.

## Example

In the example above, the `express-fileforge` utility is used directly within the `/upload` route to handle file uploads. The uploaded file is saved using `fileForge.saveFile`, and the file path is logged to the console.

Feel free to customize the route and the logic inside the route handler according to your application's requirements.

## License

This package is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This package is inspired by the need for a simple and efficient file upload solution for Express.js applications.
- Thanks to the Express.js and Node.js communities for their valuable contributions.