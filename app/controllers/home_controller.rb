class HomeController < ApplicationController
  def show
    render inertia: "Home/Show",
           props: {
             images: Image.homepage_urls,
             articles: Article.published,
             jobs: Job.all.order(start: :desc),
             socials: Social.all,
           }
  end
end
