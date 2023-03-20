# frozen_string_literal: true

class HomeController < ApplicationController
  layout -> { ApplicationLayout }
  
  def show
    render Home::ShowView.new
  end
end
