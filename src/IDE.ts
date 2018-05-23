import { observable } from "mobx";
import store from "./store";
import Workbench from "./Workbench";
import FS from "./fs";

class IDE {
  store = store;
  constructor() {
    const state = this.store.state;
    state.workbench = new Workbench();
    state.fs = new FS();
    state.panes = observable.map();
    state.tabs = observable.map();
    state.tabGroups = observable.map();
  }
}

export default IDE;
