import { StateTreeNode } from "@/sdk/store";
import { observable } from "mobx";
import {
  Titlebar,
  Activitybar,
  Sidebar,
  Editorbar,
  Panelbar,
  Statusbar
} from "./parts";

class Workbench extends StateTreeNode {
  @observable titlebar = new Titlebar();
  @observable activitybar = new Activitybar();
  @observable sidebar = new Sidebar();
  @observable editorbar = new Editorbar();
  @observable panelbar = new Panelbar();
  @observable statusbar = new Statusbar();

  constructor() {
    super();
  }
}

export default Workbench;
