# frozen_string_literal: true

class UsesController < ApplicationController
  layout -> { ApplicationLayout }
  
  def show
    render Uses::ShowView.new
  end
end
