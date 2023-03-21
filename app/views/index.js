import { application } from "../javascript/controllers/application";

import ApplicationController from "./layouts/application_controller";
import ModeToggleController from "./components/mode_toggle/controller";

application.register("application", ApplicationController);
application.register("mode-toggle", ModeToggleController);
