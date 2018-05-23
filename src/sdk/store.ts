import { observable, ObservableMap } from "mobx";

import Workbench from "./Workbench";
import FileSystem from "./FileSystem";
import Tab from "./Tab";
import Group from "./Group";
import Pane from "./Pane";

type IState = {
  workbench?: Workbench;
  fs?: FileSystem;
  tabs?: ObservableMap<string, Tab>;
  groups?: ObservableMap<string, Group>;
  panes?: ObservableMap<string, Pane>;
};

class Store {
  static $singleton: Store;
  public state = observable.object<IState>({});

  constructor() {
    if (!Store.$singleton) Store.$singleton = this;
    return Store.$singleton;
  }
}

const store = new Store();

export default store;

export class StateTreeNode {
  protected store = store;
  get globalState() {
    return this.store.state;
  }
}
