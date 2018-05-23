import { ObservableMap } from "mobx";
import Resource from "./Resource";

class Tab extends Resource {
  resources: ObservableMap<any, Tab> = this.$$resources;
  constructor() {
    super("tabs");
    this.id = String(Math.random());
  }
}

export default Tab;
