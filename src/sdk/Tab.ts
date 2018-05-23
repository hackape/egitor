import { observable, computed, action, ObservableMap } from "mobx";
import Resource from "./Resource";
import getIdFactory from "@/app/utils/getIdFactory";
const getId = getIdFactory();

class Tab extends Resource {
  resources: ObservableMap<any, Tab> = this.$$resources;
  constructor() {
    super("tabs");
    this.id = `tab@${getId()}`;
    this.register();
  }

  @observable groupId;
  @observable order = 0;

  @computed
  get group() {
    return this.globalState.groups.get(this.groupId);
  }

  @action
  destroy() {
    this.group.removeTab(this);
  }

  @computed
  get isActive() {
    return this.group.activeTabId === this.id;
  }

  @action
  activate() {
    this.group.activateTab(this);
  }
}

export default Tab;
