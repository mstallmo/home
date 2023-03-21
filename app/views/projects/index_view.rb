# frozen_string_literal: true

class Projects::IndexView < ApplicationView
  def template
    h1 { "Projects index" }
    p { "Find me in app/views/projects/index_view.rb" }
  end
end
