import { Controller } from "@hotwired/stimulus";

const SELECTED_CLASSES = ["bg-gray-800", "text-white"];
const DEFAULT_CLASSES = [
  "text-gray-400",
  "hover:text-white",
  "hover:bg-gray-800",
];

export default class extends Controller {
  static targets = ["anchor"];

  connect() {
    if (window.location.href === this.anchorTarget.href) {
      this.anchorTarget.classList.remove(...DEFAULT_CLASSES);
      this.anchorTarget.classList.add(...SELECTED_CLASSES);
    } else {
      this.anchorTarget.classList.remove(...SELECTED_CLASSES);
      this.anchorTarget.classList.add(...DEFAULT_CLASSES);
    }
  }
}
