# frozen_string_literal: true

class Admin::ImagesController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: "Admin/Images/Index",
           props: {
             images: Image.all.order(:created_at),
           }
  end

  def new
    render inertia: "Admin/Images/New"
  end

  def create
    image = Image.new(image_params)
    if image.save
      render inertia: "Admin/Images/New"
    else
      redirect_to new_admin_images_path, inertia: { errors: image.errors }
    end
  end

  private

  def image_params
    params.permit(:name, :media)
  end
end
