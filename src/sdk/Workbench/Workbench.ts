import { StateTreeNode } from "@/sdk/store";
import { observable } from "mobx";
import { Editorbar } from "./parts";

class Workbench extends StateTreeNode {
  @observable editorbar = new Editorbar();

  constructor() {
    super();
  }
}

export default Workbench;
