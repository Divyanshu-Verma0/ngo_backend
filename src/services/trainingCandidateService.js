const { supabaseAdmin } = require('../config/database');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class TrainingCandidateService {
  static async createCandidate(candidateData) {
    try {
      const { first_name, middle_name, last_name, qualification, state, city, family_income, course, mobile, email } = candidateData;

      const { data, error } = await supabaseAdmin
        .from('training-candidate')
        .insert([{
          first_name,
          middle_name,
          last_name,
          qualification, // expects JSON
          state, // expects JSON
          city, // expects JSON
          family_income, // expects JSON
          course, // expects JSON
          mobile, // expects numeric
          email
        }])
        .select()
        .single();

      if (error) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);
      }

      logSuccess('Training candidate created successfully', { candidateId: data.id });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllCandidates() {
    try {
      const { data, error } = await supabaseAdmin
        .from('training-candidate')
        .select('*');

      if (error) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);
      }

      logSuccess('Training candidates retrieved successfully', { count: data.length });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getCandidateById(candidateId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('training-candidate')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (error) {
        throw handleError(ERROR_TYPES.NOT_FOUND_ERROR, 'Training candidate not found');
      }

      logSuccess('Training candidate retrieved successfully', { candidateId });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingCandidateService;