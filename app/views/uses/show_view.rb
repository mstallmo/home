# frozen_string_literal: true

class Uses::ShowView < ApplicationView
  def template
    h1 { "Uses show" }
    p { "Find me in app/views/uses/show_view.rb" }
  end
end
