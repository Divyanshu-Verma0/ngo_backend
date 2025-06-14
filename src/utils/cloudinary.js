const cloudinary = require('cloudinary').v2;
const { handleError } = require('./errorHandler');
const { ERROR_TYPES } = require('../config/constants');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  /**
   * Upload file to Cloudinary
   * @param {Buffer} fileBuffer - File buffer from multer
   * @param {string} folder - Cloudinary folder path
   * @param {string} fileName - Optional custom file name
   * @returns {Promise<string>} - Cloudinary URL
   */
  static async uploadFile(fileBuffer, folder, fileName = null) {
    try {
      return new Promise((resolve, reject) => {
        const uploadOptions = {
          folder: folder,
          resource_type: 'auto', // Automatically detect file type
          quality: 'auto:good', // Optimize quality
          fetch_format: 'auto', // Optimize format
        };

        if (fileName) {
          uploadOptions.public_id = fileName;
        }

        cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              reject(handleError(ERROR_TYPES.INTERNAL_ERROR, `Cloudinary upload failed: ${error.message}`));
            } else {
              resolve(result.secure_url);
            }
          }
        ).end(fileBuffer);
      });
    } catch (error) {
      throw handleError(ERROR_TYPES.INTERNAL_ERROR, `File upload failed: ${error.message}`);
    }
  }

  /**
   * Upload candidate files
   * @param {Object} files - Files object from multer
   * @param {string} candidateId - Candidate ID for folder naming
   * @returns {Promise<Object>} - URLs object
   */
  static async uploadCandidateFiles(files, candidateId) {
    const urls = {};

    try {
      if (files.aadharFile && files.aadharFile[0]) {
        urls.aadharFile = await this.uploadFile(
          files.aadharFile[0].buffer,
          `candidates/aadhar`,
          `${candidateId}_aadhar`
        );
      }

      if (files.paymentReference && files.paymentReference[0]) {
        urls.paymentReference = await this.uploadFile(
          files.paymentReference[0].buffer,
          `candidates/payment`,
          `${candidateId}_payment`
        );
      }

      return urls;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload employer document
   * @param {Object} file - File object from multer
   * @param {string} employerId - Employer ID for folder naming
   * @returns {Promise<string>} - Cloudinary URL
   */
  static async uploadEmployerDocument(file, employerId) {
    try {
      if (!file) return null;

      return await this.uploadFile(
        file.buffer,
        `employers/documents`,
        `${employerId}_company_doc`
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload training provider document
   * @param {Object} file - File object from multer
   * @param {string} providerId - Provider ID for folder naming
   * @returns {Promise<string>} - Cloudinary URL
   */
  static async uploadTrainingProviderDocument(file, providerId) {
    try {
      if (!file) return null;

      return await this.uploadFile(
        file.buffer,
        `training-providers/documents`,
        `${providerId}_agency_doc`
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete file from Cloudinary
   * @param {string} publicId - Public ID of the file to delete
   * @returns {Promise<Object>} - Deletion result
   */
  static async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw handleError(ERROR_TYPES.INTERNAL_ERROR, `File deletion failed: ${error.message}`);
    }
  }
}

module.exports = CloudinaryService;