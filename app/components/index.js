import { application } from "../javascript/controllers/application";
import SideBarController from "./sidebar_controller";
import SideBarLinkController from "./sidebar_link_controller";

application.register("sidebar", SideBarController);
application.register("sidebar-link", SideBarLinkController);
