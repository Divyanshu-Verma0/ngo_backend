const Candidate = require('../models/candidate');
const TrainingProvider = require('../models/trainingProvider');
const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class TrainingProviderService {
  static async editSkills(trainingProviderId, skills) {
    try {
      const provider = await TrainingProvider.findById(trainingProviderId);
      if (!provider) throw handleError(ERROR_TYPES.NOT_FOUND, 'Training provider not found');

      // Update skills (assuming skills is an array of strings)
      provider.skills = skills;
      await provider.save();

      return provider;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAssignedCandidates(trainingProviderId, status) {
    try {
      // Build the query dynamically
      const query = { trainingProviderId };
      if (status) {
        query.status = status; // Add status filter if provided
      }

      return Candidate.find(query); // Execute query with optional filtering
    } catch (error) {
      throw error;
    }
  }


  static async getSingleCandidate(candidateId) {
    try {
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) throw handleError(ERROR_TYPES.NOT_FOUND, 'Candidate not found');
      return candidate;
    } catch (error) {
      throw error;
    }
  }

  static async updateCandidateStatus(candidateId, status) {
    try {
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) throw handleError(ERROR_TYPES.NOT_FOUND, 'Candidate not found');

      // Update candidate status
      candidate.status = status;
      await candidate.save();

      return candidate;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingProviderService;
