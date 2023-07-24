class HomeController < ApplicationController
  def show
    articles = Article.all

    render inertia: "Home/Show", props: { articles: articles }
  end
end
