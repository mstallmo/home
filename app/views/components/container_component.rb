# frozen_string_literal: true

class ContainerComponent < ApplicationComponent
  def initialize(*props)
    @class_name = props.last.delete :class
    @props = props.last
  end

  def template(&)
    div(class: outer_container_class, **@props) do
      div(class: "mx-auto max-w-7xl lg:px-8") do
        div(class: "mx-auto max-w-2xl lg:max-w-5xl", &)
      end
    end
  end

  private

  def outer_container_class
    "sm:px-8 #{@class_name}" if @class_name
  end

  def props_hash
    @props
  end
end
