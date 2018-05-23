import { observable } from "mobx";

class Store {
  static $singleton: Store;
  public state = observable({
    tabGroups: observable.map({})
  });

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
