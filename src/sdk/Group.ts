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

  @computed
  get tabs() {
    return values(this.globalState.tabs)
      .filter(tab => tab.groupId === this.id)
      .sort((tab1, tab2) => tab1.order - tab2.order);
  }

  @action
  addTab() {
    const tab = new Tab();
    this.activeTabId = tab.id;
    const lastIndex = this.tabs.length;
    tab.groupId = this.id;
    tab.order = lastIndex;
  }

  @action
  activateTab(tab: Tab) {
    this.activeTabId = tab.id;
  }

  @action
  removeTab(tab: Tab) {
    if (tab.id === this.activeTabId) {
      const closestTab = this.getClosestTab(tab);
      if (closestTab) {
        this.activeTabId = closestTab.id;
      }
    }
    this.globalState.tabs.delete(tab.id);
  }

  getNextTab(tab: Tab) {
    return this.tabs[tab.order + 1];
  }

  getPrevTab(tab: Tab) {
    return this.tabs[tab.order - 1];
  }

  getClosestTab(tab: Tab) {
    const closestTab = this.getNextTab(tab) || this.getPrevTab(tab);
    return closestTab;
  }

  @action
  handleTabDrop(tabId: string) {
    const tab = this.globalState.tabs.get(tabId);
    if (tab.groupId !== this.id) {
      tab.groupId = this.id;
    }
    tab.order = this.tabs.length;
    this.activateTab(tab);
  }
}

export default Group;
