import { StateTreeNode } from "../store";
import {
  Titlebar,
  Activitybar,
  Sidebar,
  Editorbar,
  Panelbar,
  Statusbar
} from "./parts";

class Workbench extends StateTreeNode {
  titlebar = new Titlebar();
  activitybar = new Activitybar();
  sidebar = new Sidebar();
  editorbar = new Editorbar();
  panelbar = new Panelbar();
  statusbar = new Statusbar();

  constructor() {
    super();
  }
}

export default Workbench;
