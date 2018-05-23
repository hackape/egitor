import { ObservableMap } from "mobx";
import Resource from "./Resource";

class TabGroup extends Resource {
  resources: ObservableMap<any, TabGroup> = this.$$resources;
  constructor() {
    super("tabGroups");
    this.id = String(Math.random());
  }
}

export default TabGroup;
