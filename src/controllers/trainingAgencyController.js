const TrainingAgencyService = require('../services/trainingAgencyService');
const ResponseHandler = require('../utils/response');

class TrainingAgencyController {
  static async createAgency(req, res, next) {
    try {
      const agency = await TrainingAgencyService.createAgency(req.body);
      ResponseHandler.created(res, agency, 'Training agency created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAllAgencies(req, res, next) {
    try {
      const agencies = await TrainingAgencyService.getAllAgencies();
      ResponseHandler.success(res, agencies, 'Training agencies retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getAgencyById(req, res, next) {
    try {
      const agency = await TrainingAgencyService.getAgencyById(req.params.id);
      ResponseHandler.success(res, agency, 'Training agency retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingAgencyController;