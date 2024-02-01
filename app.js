const express = require('express');
const fileForge = require('./index'); // Make sure deleteFile is exported from here
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