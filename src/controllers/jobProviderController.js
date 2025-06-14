const JobProviderService = require('../services/jobProviderService');
const ResponseHandler = require('../utils/response');

class JobProviderController {
  static async createJob(req, res, next) {
    try {
      const employerId = req.user.referenceId; // Authenticated employerId
      const jobData = { ...req.body, employerId };
      const result = await JobProviderService.createJob(jobData);
      ResponseHandler.success(res, result, 'Job created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async editJob(req, res, next) {
    try {
      const { id } = req.params;
      const jobData = req.body; // Updated job details
      const result = await JobProviderService.editJob(id, jobData);
      ResponseHandler.success(res, result, 'Job updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const { id } = req.params;
      await JobProviderService.deleteJob(id);
      ResponseHandler.success(res, null, 'Job deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllAssignedCandidates(req, res, next) {
    try {
      const employerId = req.user.referenceId; // Authenticated employerId
      const { status } = req.query; // Optional query parameter for status filtering
      const result = await JobProviderService.getAllAssignedCandidates(employerId, status);
      ResponseHandler.success(res, result, 'Assigned candidates fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSingleCandidate(req, res, next) {
    try {
      const { id } = req.params;
      const result = await JobProviderService.getSingleCandidate(id);
      ResponseHandler.success(res, result, 'Candidate fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JobProviderController;
