import { observable, computed, ObservableMap } from "mobx";
// configure({ enforceActions: "strict" });

import Workbench from "./Workbench";
import FileSystem from "./FileSystem";
import Tab from "./Tab";
import Group from "./Group";

export type IState = {
  workbench?: Workbench;
  fs?: FileSystem;
  tabs?: ObservableMap<string, Tab>;
  groups?: ObservableMap<string, Group>;
};

class Store {
  static $singleton: Store;
  @observable public state = observable.object<IState>({});

  constructor() {
    if (!Store.$singleton) Store.$singleton = this;
    return Store.$singleton;
  }
}

const store = new Store();

export default store;

export class StateTreeNode {
  protected store = store;
  @computed
  get globalState() {
    return this.store.state;
  }
}
