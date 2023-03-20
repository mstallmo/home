# frozen_string_literal: true

class Home::ShowView < ApplicationView
  def template
    h1 { "Home show" }
    p { "Find me in app/views/home/show_view.rb" }
  end
end
