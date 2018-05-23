import { observable } from "mobx";
import store from "./store";
import Win from "./win";
import FS from "./fs";

export default class IDE {
  store = store;
  constructor() {
    const state = this.store.state;
    state.win = new Win();
    state.fs = new FS();
    state.panes = observable.map();
    state.tabs = observable.map();
    state.tabGroups = observable.map();
  }
}
