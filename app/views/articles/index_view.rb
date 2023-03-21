# frozen_string_literal: true

class Articles::IndexView < ApplicationView
  def template
    h1 { "Articles index" }
    p { "Find me in app/views/articles/index_view.rb" }
  end
end
