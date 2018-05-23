import { observable, computed } from "mobx";
import Part from "./Part";

class Editorbar extends Part {
  constructor() {
    super();
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
}

export default Editorbar;
