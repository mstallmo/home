class ArticlesController < ApplicationController
  def index
    render inertia: "Articles/Index",
           props: {
             articles: Article.all.order(:updated_at),
           }
  end

  def show
    render inertia: "Articles/Show",
           props: {
             article: Article.find(params[:id]),
           }
  end
end
