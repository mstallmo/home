# frozen_string_literal: true

class Admin::ArticlesController < ApplicationController
  before_action :authenticate_user!

  def index
    sort_attribute =
      case params[:sort]
      when "title"
        :title
      when "updated_at"
        :updated_at
      when "publish_status"
        :publish_status
      else
        :updated_at
      end

    render inertia: "Admin/Articles/Index",
           props: {
             articles: Article.all.order(sort_attribute),
           }
  end

  def new
    render inertia: "Admin/Articles/New"
  end

  def edit
    render inertia: "Admin/Articles/Edit",
           props: {
             article: Article.find(params[:id]),
           }
  end

  def create
    article = Article.new(article_params)
    if article.save
      redirect_to admin_articles_path
    else
      redirect_to new_admin_article_path, inertia: { errors: article.errors }
    end
  end

  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      redirect_to admin_articles_path
    else
      redirect_to edit_admin_article_path, inertia: { errors: article.errors }
    end
  end

  def destroy
    article = Article.find(params[:id])

    if article.destroy
      redirect_to admin_articles_path
    else
      redirect_to edit_admin_article_path, inertia: { errors: article.errors }
    end
  end

  private

  def article_params
    new_article_params =
      params.require(:article).permit(
        :title,
        :description,
        :content,
        :publish_status,
      )

    if new_article_params[:publish_status] == "published"
      new_article_params.merge({ published_at: Time.zone.now })
    else
      new_article_params
    end
  end
end
