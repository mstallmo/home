# frozen_string_literal: true

class Articles::ShowView < ApplicationView
  def template
    h1 { "Articles show" }
    p { "Find me in app/views/articles/show_view.rb" }
  end
end
