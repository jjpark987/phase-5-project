# Load the dotenv gem to read environment variables from .env file
require 'dotenv/load'

# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
