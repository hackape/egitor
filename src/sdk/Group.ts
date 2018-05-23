import { values, observable, computed, action, ObservableMap } from "mobx";
import Resource from "./Resource";
import Tab from "@/sdk/Tab";
import getIdFactory from "@/app/utils/getIdFactory";
const getId = getIdFactory();

class Group extends Resource {
  resources: ObservableMap<any, Group> = this.$$resources;
  constructor() {
    super("groups");
    this.id = `group@${getId()}`;
    this.register();
  }

  @observable activeTabId: string;

  @computed
  get activeTab() {
    return this.globalState.tabs.get(this.activeTabId);
  }
}

export default Group;
