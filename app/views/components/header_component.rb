# frozen_string_literal: true

class HeaderComponent < ApplicationComponent
  include Phlex::Rails::Helpers::LinkTo
  include Phlex::Rails::Helpers::ImageTag

  def initialize(is_home_page = false)
    @is_home_page = is_home_page
  end

  def template
    header(
      class: "pointer-events-none relative z-50 flex flex-col",
      style: "var(--header-height); var(--header-mb)",
    ) do
      home_page_header if @is_home_page
      navbar
    end
  end

  def home_page_header
    div(class: "order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]")
    render ContainerComponent.new(
             class: "top-0 order-last -mb-3 pt-3",
             style: "position:var(--header-position)",
           ) do
      div(
        class: "top-[var(--avatar-top,theme(spacing.3))] w-full",
        style: "position:var(--header-inner-position)",
      ) do
        div(class: "relative") do
          avatar_container(
            class: "absolute left-0 top-3 origin-left transition-opacity",
            style:
              "opacity:var(--avatar-border-opacity, 0);transform:var(--avatar-border-transform)",
          )
          avatar(
            true,
            class: "block h-16 w-16 origin-left",
            style: "transform:var(--avatar-image-transform)",
          )
        end
      end
    end
  end

  def navbar
    div(
      class: "top-0 z-10 h-16 pt-6",
      style: "position:var(--header-position)",
    ) do
      render ContainerComponent.new(
               class: "top-[var(--header-top,theme(spacing.6))] w-full",
               style: "position:var(--header-inner-position)",
             ) do
        div(class: "relative flex gap-4") do
          div(class: "flex flex-1") do
            avatar_container { avatar } unless @is_home_page
          end
          div(class: "flex flex-1 justify-end md:justify-center") do
            desktop_navigation class: "pointer-events-auto hidden md:block"
          end
          div(class: "flex justify-end md:flex-1") do
            div(class: "pointer-events-auto") do
              render ModeToggle::Component.new
            end
          end
        end
      end
    end
  end

  def avatar_container(props)
    class_name = (props.delete(:class) if props[:class])

    div(
      class:
        (
          if class_name
            "#{class_name} h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
          end
        ),
      **props,
    )
  end

  def avatar(large = false, props)
    class_name = (props.delete(:class) if props[:class])

    link_to root_path,
            :class => ("#{class_name} pointer-events-auto"),
            "aria-label" => "home",
            **props do
      image_tag "avatar",
                sizes: large ? "4rem" : "2.25rem",
                class:
                  "rounded-full bg-zinc-100 object-cover dark:bg-zinc-900 #{large ? "h-16 w-16" : "h-9 w-9"}"
    end
  end

  def desktop_navigation(props)
    nav(**props) do
      ul(
        class:
          "flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10",
      ) do
        nav_item(href: about_path) { "About" }
        nav_item(href: articles_path) { "Articles" }
        nav_item(href: projects_path) { "Projects" }
        nav_item(href: projects_path) { "Uses" }
      end
    end
  end

  def nav_item(href:, &block)
    # TODO: implement is_active
    li do
      link_to(
        href,
        class:
          "relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400",
        &block
      )
    end
  end
end
