# frozen_string_literal: true

class Projects::ShowView < ApplicationView
  def template
    h1 { "Projects show" }
    p { "Find me in app/views/projects/show_view.rb" }
  end
end
