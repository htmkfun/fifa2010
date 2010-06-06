# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_fifa2010_session',
  :secret      => '3d805bd7baac72c100d9953de2458bae3ef32c5a33f4a9f3573633372a096ec966a5a88cd5428655ec102b6dc2e31e1e02f6549786bdb06376ecc95a1021a927'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
