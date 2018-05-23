import { ObservableMap, reactive } from "utils/mobx";
import Resource from "./Resource";
import getIdFactory from "@/app/utils/getIdFactory";
const getId = getIdFactory();

@reactive
class Tab extends Resource {
  resources: ObservableMap<any, Tab> = this.$$resources;
  constructor() {
    super("tabs");
    this.id = `tab@${getId()}`;
    this.register();
  }

  groupId = "";
  order = 0;

  get group() {
    return this.globalState.groups.get(this.groupId);
  }

  destroy() {
    this.group.removeTab(this);
  }

  get isActive() {
    return this.group.activeTabId === this.id;
  }

  activate() {
    this.group.activateTab(this);
  }
}

export default Tab;
