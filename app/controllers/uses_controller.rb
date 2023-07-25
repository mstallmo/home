class UsesController < ApplicationController
  def show
    render inertia: "Uses/Show", props: {}
  end
end
