import { observable, ObservableMap } from "mobx";

import Workbench from "./Workbench";
import FS from "./fs";
import Tab from "./tab";
import TabGroup from "./tabGroup";
import Pane from "./pane";

type IState = {
  workbench?: Workbench;
  fs?: FS;
  tabs?: ObservableMap<string, Tab>;
  tabGroups?: ObservableMap<string, TabGroup>;
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
