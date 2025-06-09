const { supabaseAdmin, supabaseAuth } = require('../config/database');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class AuthService {
  static async signUp(userData) {
    try {
      const { email, password, username, first_name, middle_name, last_name, mobile, address, organization } = userData;

      // Create user with Supabase Auth
      const { data: signUpData, error: signUpError } = await supabaseAuth.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (signUpError) {
        throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, signUpError.message);
      }

      const userId = signUpData.user.id;

      // Insert user metadata
      const { error: insertError, data: userRecord } = await supabaseAdmin
        .from('users')
        .insert([{
          id: userId,
          username,
          first_name,
          middle_name,
          last_name,
          mobile,
          email,
          address,
          organization
        }])
        .select()
        .single();

      if (insertError) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, insertError.message);
      }

      logSuccess('User created successfully', { userId, email });
      return { user: userRecord, session: signUpData.session };
    } catch (error) {
      throw error;
    }
  }

  static async signIn(email, password) {
    try {
      const { data, error } = await supabaseAuth.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, error.message);
      }

      logSuccess('User signed in successfully', { userId: data.user.id, email });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;