const { createClient } = require('@supabase/supabase-js');
const config = require('./environment');

// Admin client for server operations
const supabaseAdmin = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_ROLE_KEY
);

// Auth client for authentication
const supabaseAuth = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY
);

module.exports = {
  supabaseAdmin,
  supabaseAuth
};