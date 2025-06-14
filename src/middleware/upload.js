const multer = require('multer');
const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

// File filter for images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'application/pdf'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(handleError(ERROR_TYPES.VALIDATION_ERROR, 'Only images (JPEG, PNG, GIF) and PDF files are allowed'), false);
  }
};

// Multer configuration
const multerConfig = {
  storage: multer.memoryStorage(), // Store files in memory for Cloudinary upload
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
};

// Create multer instance
const upload = multer(multerConfig);

// Middleware for candidate registration (multiple files)
const uploadCandidateFiles = upload.fields([
  { name: 'aadharFile', maxCount: 1 },
  { name: 'paymentReference', maxCount: 1 }
]);

// Middleware for employer registration (single file)
const uploadEmployerFile = upload.single('companyDocFile');

// Middleware for training provider registration (single file)
const uploadTrainingProviderFile = upload.single('agencyDocFile');

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error';
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File size too large. Maximum size is 5MB';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files uploaded';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      default:
        message = error.message;
    }
    
    return next(handleError(ERROR_TYPES.VALIDATION_ERROR, message));
  }
  
  next(error);
};

module.exports = {
  uploadCandidateFiles,
  uploadEmployerFile,
  uploadTrainingProviderFile,
  handleMulterError
};