import { application } from "../javascript/controllers/application";
import DesktopNavigationController from "./headers/desktop_navigation_controller";
import ModeToggleController from "./headers/mode_toggle._controller";

application.register("desktop-navigation", DesktopNavigationController);
application.register("mode-toggle", ModeToggleController);
