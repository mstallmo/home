class ApplicationController < ActionController::Base
  include InertiaRequestProtectable

  inertia_share { { user: current_user } if user_signed_in? }
end
