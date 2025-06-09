const TrainingCandidateService = require('../services/trainingCandidateService');
const ResponseHandler = require('../utils/response');

class TrainingCandidateController {
  static async createCandidate(req, res, next) {
    try {
      const candidate = await TrainingCandidateService.createCandidate(req.body);
      ResponseHandler.created(res, candidate, 'Training candidate created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllCandidates(req, res, next) {
    try {
      const candidates = await TrainingCandidateService.getAllCandidates();
      ResponseHandler.success(res, candidates, 'Training candidates retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCandidateById(req, res, next) {
    try {
      const candidate = await TrainingCandidateService.getCandidateById(req.params.id);
      ResponseHandler.success(res, candidate, 'Training candidate retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingCandidateController;
