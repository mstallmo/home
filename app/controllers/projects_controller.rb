# frozen_string_literal: true

class ProjectsController < ApplicationController
  layout -> { ApplicationLayout }
  
  def index
    render Projects::IndexView.new
  end

  def show
    render Projects::ShowView.new
  end
end
