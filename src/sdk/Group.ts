import { observable, computed, ObservableMap } from "mobx";
import Resource from "./Resource";

class Group extends Resource {
  resources: ObservableMap<any, Group> = this.$$resources;
  constructor() {
    super("groups");
    this.id = String(Math.random());
  }

  @observable activeTabId: string;

  @computed
  get activeTab() {
    return this.globalState.tabs.get(this.activeTabId);
  }
}

export default Group;
