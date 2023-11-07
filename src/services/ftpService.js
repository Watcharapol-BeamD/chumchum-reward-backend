require("dotenv").config();
const ftp = require("basic-ftp");
const fs = require("fs");
const deleteFileFromBackend = require("./deleteUploadedImage");

const uploadImageToHost = async (filePath, fileName) => {
  try {
    //----------------------FTP-------------------------

    // Connect to the cPanel FTP
    const client = new ftp.Client();
    client.ftp.verbose = true;

    // Replace these with your cPanel FTP details
    const ftpOptions = {
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
    };
    // Connect to FTP
    await client.access(ftpOptions);

    // Directory in cPanel where to upload the file
    await client.ensureDir("/images");

    // Read the file to upload
    const data = fs.createReadStream(filePath);

    // Upload the file
    await client.uploadFrom(data, `/images/${fileName}`);

    // Close the FTP connection
    client.close();
    deleteFileFromBackend(filePath);
    //----------------------FTP-END------------------------

    // Handle success
    console.log("File uploaded to cPanel successfully");
  } catch (error) {
    // Handle error
    console.error(error);
    console.log("Error uploading file to cPanel");
  }
};

const deleteFileFromHost = async (oldFileName) => {
  try {
    // Connect to the cPanel FTP
    const client = new ftp.Client();
    client.ftp.verbose = true;

    // Replace these with your cPanel FTP details
    const ftpOptions = {
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
    };

    // Connect to FTP
    await client.access(ftpOptions);
    // Delete the old file
    await client.remove("/images/" + oldFileName);
    await client.close();
    console.log("New file uploaded to CPanel and old file deleted.");
  } catch (error) {
    console.log("Error updating files in CPanel.");
  }
};

module.exports = {
  uploadImageToHost,
  deleteFileFromHost,
};
