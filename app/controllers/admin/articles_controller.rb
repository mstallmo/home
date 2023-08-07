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
end
