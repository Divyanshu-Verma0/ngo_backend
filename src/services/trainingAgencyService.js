const { supabaseAdmin } = require('../config/database');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class TrainingAgencyService {
  static async createAgency(agencyData) {
    try {
      const { agency_name, courses, branches, mobile, email, alternate_email, landline, primary_contact_person, secondary_contact_person, address, certifications } = agencyData;

      const { data, error } = await supabaseAdmin
        .from('training-agency')
        .insert([{
          agency_name,
          courses,
          branches,
          mobile,
          email,
          alternate_email,
          landline,
          primary_contact_person,
          secondary_contact_person,
          address,
          certifications
        }])
        .select()
        .single();

      if (error) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);
      }

      logSuccess('Training agency created successfully', { agencyId: data.id });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAgencies() {
    try {
      const { data, error } = await supabaseAdmin
        .from('training-agency')
        .select('*');

      if (error) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);
      }

      logSuccess('Training agencies retrieved successfully', { count: data.length });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAgencyById(agencyId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('training-agency')
        .select('*')
        .eq('id', agencyId)
        .single();

      if (error) {
        throw handleError(ERROR_TYPES.NOT_FOUND_ERROR, 'Training agency not found');
      }

      logSuccess('Training agency retrieved successfully', { agencyId });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingAgencyService;