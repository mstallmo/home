class ProjectsController < ApplicationController
  def index
    render inertia: "Projects/Index", props: { projects: Project.all }
  end
end
