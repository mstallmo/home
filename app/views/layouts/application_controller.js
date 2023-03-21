import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.#updateMode();
    this.darkModeMediaQuery.addEventListener(
      "change",
      this.#updateModeWithoutTransitions
    );
    window.addEventListener("storage", this.#updateModeWithoutTransitions);
  }

  #updateMode() {
    let isSystemDarkMode = this.darkModeMediaQuery.matches;
    let isDarkMode =
      window.localStorage.isDarkMode === "true" ||
      (!("isDarkMode" in window.localStorage) && isSystemDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    }
  }

  #disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  }

  #updateModeWithoutTransitions() {
    this.#disableTransitionsTemporarily();
    this.#updateMode();
  }
}
