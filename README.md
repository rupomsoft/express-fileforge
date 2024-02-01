`express-fileforge` is a file upload utility for Express.js that simplifies file handling. It provides a convenient way to save files to the server and manage file storage paths. This package is designed to be easy to use and integrate seamlessly with your Express.js applications.

```bash
npm install express-fileforge
```

## Express JS Example 
```javascript
const express = require('express');
const fileForge = require('express-fileforge'); 
const path = require('path');
const app = express();

// Your route for file upload
app.post('/upload', async function (req, res) {
    try {
        // Upload file
        let uploadedFile = await fileForge.saveFile(req, path.resolve(__dirname),'myFiles', 'abc.pdf');
        res.end(`File uploaded successfully: ${uploadedFile}`);
    } catch (error) {
        console.error(error);
        res.status(500).end('Internal Server Error');
    }
});

// Route for file deletion
app.delete('/delete/:fileName', async function (req, res) {
    try {

        // File name from the URL parameter
        const fileName = req.params.fileName;

        // Delete the specified file
        const isDeleted = await fileForge.deleteFile(path.resolve(__dirname),'myFiles',  fileName);
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



## How To Delete Using Fetch
```javascript
const deleteFile = async () => {
    const FileName = "abc.pdf";
    const requestOptions = {method: 'DELETE'};
    try {
        const response = await fetch(`http://localhost:5050/delete/${FileName}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
};
// Call the async function
deleteFile();

```



## How To Delete Using Axios
```javascript
const deleteFile = async () => {
    const FileName = "abc.pdf";
    try {
        const response = await axios.delete(`http://localhost:5050/delete/${FileName}`);
        console.log(response.data);
    } catch (error) {
        console.log('error', error.message);
    }
};
// Call the async function
deleteFile();
```



## License

This package is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- This package is inspired by the need for a simple and efficient file upload solution for Express.js applications.
- Thanks to the Express.js and Node.js communities for their valuable contributions.