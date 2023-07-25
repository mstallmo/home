class AboutController < ApplicationController
  def show
    render inertia: "About/Show", props: { socials: Social.all }
  end
end
