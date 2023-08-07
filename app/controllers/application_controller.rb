class ApplicationController < ActionController::Base
  inertia_share { { user: current_user } if user_signed_in? }
end
