class HomeController < ApplicationController
  def show
    render inertia: "Home/Show",
           props: {
             articles: Article.all,
             jobs: Job.all.order(start: :desc),
             socials: Social.all,
           }
  end
end
