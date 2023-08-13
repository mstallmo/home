class ArticlesController < ApplicationController
  def index
    render inertia: "Articles/Index",
           props: {
             articles: Article.published.order(:updated_at),
           }
  end

  def show
    article = Article.find(params[:id])

    if article.published?
      render inertia: "Articles/Show", props: { article: article }
    else
      redirect_to articles_path
    end
  end
end
