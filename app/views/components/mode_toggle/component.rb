# frozen_string_literal: true

class ModeToggle::Component < ApplicationComponent
  def template
    button(
      aria_label: "Toggle dark mode",
      data_controller: "mode-toggle",
      data_action: "mode-toggle#toggleMode",
      class:
        "group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
    ) do
      render SunIcon.new class:
                           "h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
      render MoonIcon.new class:
                            "hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500"
    end
  end

  class SunIcon < Phlex::SVG
    def initialize(props)
      @props = props
    end

    def template
      svg(
        view_box: "0 0 24 24",
        stroke_width: "1.5",
        stroke_linecap: "round",
        stroke_linejoin: "round",
        aria_hidden: true,
        **@props,
      ) do
        path d:
               "M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
        path d:
               "M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061",
             fill: "none"
      end
    end
  end

  class MoonIcon < Phlex::SVG
    def initialize(props)
      @props = props
    end

    def template
      svg(view_box: "0 0 24 24", aria_hidden: true, **@props) do
        path d:
               "M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z",
             stroke_width: "1.5",
             stroke_linecap: "round",
             stroke_linejoin: "round"
      end
    end
  end
end
