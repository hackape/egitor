import { ObservableMap } from "mobx";
import Resource from "./Resource";

class Group extends Resource {
  resources: ObservableMap<any, Group> = this.$$resources;
  constructor() {
    super("groups");
    this.id = String(Math.random());
  }
}

export default Group;
