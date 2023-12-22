class ApplicationController < ActionController::Base
  include InertiaRequestProtectable

  inertia_share { { user: current_user } if user_signed_in? }
  
  # For whatever reason inertia is trying to call merge on nil if we don't
  # return a hash from the `inertia_share` method. The example documentation
  # doesn't seem to show this but that is the current behavior. Will leave this
  # in until there is an update or I can figure out the root cause of the behavior.
  inertia_share do
    if flash[:notice].present?
      {
        success: flash[:notice]
      }
    else
      {}
    end
  end
end
