import { observable, computed, action, values } from "mobx";
import Part from "./Part";
import Group from "@/sdk/Group";

class Editorbar extends Part {
  constructor() {
    super();
    if (!this.groups.length) {
      this.addGroup();
    }
  }

  @observable activeGroupId: string;
  @computed
  get activeGroup() {
    return this.globalState.groups.get(this.activeGroupId);
  }

  @computed
  get activeTab() {
    return this.activeGroup.activeTab;
  }

  @computed
  get groups() {
    return values(this.globalState.groups);
  }

  @action
  addGroup() {
    const group = new Group();
    this.activeGroupId = group.id;
  }
}

export default Editorbar;
