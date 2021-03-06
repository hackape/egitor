import { extendObservable, observable, runInAction, autorun } from "mobx";
import store from "./store";
import Workbench from "./Workbench";
import FileSystem from "./FileSystem";

class IDE {
  static $singleton: IDE;
  @observable store = store;

  constructor() {
    if (IDE.$singleton) return IDE.$singleton;

    runInAction("initialize store state", () => {
      extendObservable(this.store.state, {
        tabs: observable.map(),
        groups: observable.map()
      });
      extendObservable(this.store.state, {
        fs: new FileSystem(),
        workbench: new Workbench()
      });
    });

    this.kickStartMaintainers();
  }

  kickStartMaintainers() {
    autorun(() => {
      this.store.state.groups.forEach(group => {
        group.tabs.forEach((tab, index) => (tab.order = index));
      });
    });
  }
}

export default IDE;
