import { Controller } from "@hotwired/stimulus";

const ACTIVE_CLASSES = [
  "text-teal-500",
  "dark:text-teal-400",
  "px-3",
  "py-2",
  "transition",
];

export default class extends Controller {
  static targets = ["navLink"];

  connect() {
    for (const navLink of this.navLinkTargets) {
      if (window.location.href === navLink.href) {
        navLink.classList.add(...ACTIVE_CLASSES);
      }
    }
  }
}
