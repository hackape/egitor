import { observable } from "mobx";
import store from "./store";
import Workbench from "./Workbench";
import FileSystem from "./FileSystem";

class IDE {
  store = store;
  constructor() {
    const state = this.store.state;
    state.workbench = new Workbench();
    state.fs = new FileSystem();
    state.panes = observable.map();
    state.tabs = observable.map();
    state.groups = observable.map();
  }
}

export default IDE;
