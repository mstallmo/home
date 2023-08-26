# frozen_string_literal: true

module InertiaRequestProtectable
  extend ActiveSupport::Concern

  included do
    prepend_before_action do
      request.headers["HTTP_X_CSRF_TOKEN"] = request.headers[
        "HTTP_X_XSRF_TOKEN"
      ] if request.headers["HTTP_X_XSRF_TOKEN"] && request.headers["X-Inertia"]
    end

    after_action do
      cookies[
        "XSRF-TOKEN"
      ] = form_authenticity_token if protect_against_forgery?
    end
  end
end
