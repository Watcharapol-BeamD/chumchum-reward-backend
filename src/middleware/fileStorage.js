const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Define the destination to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for the uploaded file
    }
  });
  
const upload = multer({ storage: storage });

module.exports = upload;
 
//---------------------------------