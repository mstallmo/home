import { Controller } from "@hotwired/stimulus";
import { enter, leave } from "el-transition";

export default class extends Controller {
  static targets = ["container", "backdrop", "menu", "closeButton"];

  show() {
    console.log("showing!");
    this.containerTarget.classList.remove("hidden");
    enter(this.backdropTarget);
    enter(this.menuTarget);
    enter(this.closeButtonTarget);
  }

  hide() {
    Promise.all([
      leave(this.backdropTarget),
      leave(this.menuTarget),
      leave(this.closeButtonTarget),
    ]).then(() => {
      this.containerTarget.classList.add("hidden");
    });
  }
}
