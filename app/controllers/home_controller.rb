class HomeController < ApplicationController
  def show
    render inertia: "Home/Show", props: {}
  end
end
