const fs = require('fs');
const path = require('path');

exports.saveFile = async (req, baseDir, dirName, fileName) => {
    try {
        const uploadDir = path.join(baseDir, dirName);
        const filePath = path.join(uploadDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        let boundaryFound = false;

        // Event listener for receiving data
        req.on('data', (chunk) => {
            if (boundaryFound) {
                writeStream.write(chunk);
            } else {
                // Search for the boundary indicating the start of file data
                const boundaryIndex = chunk.indexOf('\r\n\r\n');
                if (boundaryIndex !== -1) {
                    boundaryFound = true;
                    const fileDataStartIndex = boundaryIndex + 4; // Skip the boundary and newlines
                    writeStream.write(chunk.slice(fileDataStartIndex));
                }
            }
        });

        // Event listener for end of data transmission
        req.on('end', () => {
            writeStream.end();
        });

        // Wait for the 'finish' event of the write stream
        await new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                const relativePath = path.relative(baseDir, filePath);
                resolve(relativePath);
            });
            // Event listener for 'error' event of the write stream
            writeStream.on('error', (error) => {
                reject(error);
            });
        });

        // Return the relative path of the saved file
        return path.relative(baseDir, filePath);
    } catch (error) {
        console.error('Error saving file:', error);
        return false;
    }
};


exports.deleteFile = async (baseDir, dirName, fileName) => {
    try {
        const uploadDir = path.join(baseDir, dirName);
        const filePath = path.join(uploadDir, fileName);
        // Check if file exists
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};