import { ObservableMap } from "mobx";
import Resource from "./resource";

class Pane extends Resource {
  resources: ObservableMap<any, Pane> = this.$$resources;
  constructor() {
    super("panes");
    this.id = String(Math.random());
  }
}

export default Pane;
