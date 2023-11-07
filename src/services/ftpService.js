const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2-sftp-client');

const sftp = new Client();

const sftpConfig = {
    host: 'your_sftp_host',
    port: 'your_sftp_port', // Default SFTP port is 22
    username: 'your_sftp_username',
    password: 'your_sftp_password'
    // Add other configurations as needed
  };

const conSftp=   await sftp.connect(sftpConfig);

module.exports = conSftp