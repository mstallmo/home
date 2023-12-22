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

  def edit
    render inertia: "Admin/Images/Edit",
           props: {
             image: Image.find(params[:id]),
           }
  end

  def create
    image = Image.new(image_params)
    if image.save
      render inertia: "Admin/Images/New"
    else
      redirect_to new_admin_images_path, inertia: { errors: image.errors }
    end
  end

  def update
    image = Image.find(params[:id])

    if image.update(update_image_params)
      flash[:notice] = "Image #{image.name} updated!"
      redirect_to edit_admin_image_path(image)
    else
      redirect_to edit_admin_image_path(image),
                  inertia: {
                    errors: image.errors,
                  }
    end
  end

  private

  def image_params
    params.permit(:name, :media)
  end

  def update_image_params
    params.require(:image).permit(:name, :homepage)
  end
end
