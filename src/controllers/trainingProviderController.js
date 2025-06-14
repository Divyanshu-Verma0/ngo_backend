const TrainingProviderService = require('../services/trainingProviderService');
const ResponseHandler = require('../utils/response');

class TrainingProviderController {
  static async editSkills(req, res, next) {
    try {
      const { skills } = req.body; // Pass skill additions/removals in the request body
      const trainingProviderId = req.user.referenceId; // Authenticated trainingProviderId
      const result = await TrainingProviderService.editSkills(trainingProviderId, skills);
      ResponseHandler.success(res, result, 'Skills updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllAssignedCandidates(req, res, next) {
    try {
      const trainingProviderId = req.user.referenceId; // Authenticated trainingProviderId
      const { status } = req.query; // Optional query parameter for status filtering
      const result = await TrainingProviderService.getAllAssignedCandidates(trainingProviderId, status);
      ResponseHandler.success(res, result, 'Assigned candidates fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSingleCandidate(req, res, next) {
    try {
      const { id } = req.params;
      const result = await TrainingProviderService.getSingleCandidate(id);
      ResponseHandler.success(res, result, 'Candidate fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateCandidateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body; // Expected statuses: L1_APPROVED, L2_APPROVED
      const result = await TrainingProviderService.updateCandidateStatus(id, status);
      ResponseHandler.success(res, result, 'Candidate status updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingProviderController;
