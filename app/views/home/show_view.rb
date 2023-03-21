# frozen_string_literal: true

class Home::ShowView < ApplicationView
  def template
    render HeaderComponent.new(true)
  end
end
