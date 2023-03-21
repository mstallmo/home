# frozen_string_literal: true

class ApplicationLayout < ApplicationView
  include Phlex::Rails::Layout

  def template(&block)
    doctype

    html(class: "h-full antialiased", data_controller: "application") do
      head do
        title { "You're awesome" }
        meta name: "viewport", content: "width=device-width,initial-scale=1"
        csp_meta_tag
        csrf_meta_tags
        stylesheet_link_tag "application", data_turbo_track: "reload"
        javascript_include_tag "application",
                               "data-turbo-track": "reload",
                               defer: true
      end

      body(class: "flex h-full flex-col bg-zinc-50 dark:bg-black") do
        div(class: "fixed inset-0 flex justify-center sm:px-8") do
          div(class: "flex w-full max-w-7xl lg:px-8") do
            div(
              class:
                "w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20",
            )
          end
        end
        div(class: "relative") { main(&block) }
      end
    end
  end
end
