import { observable, computed, action, ObservableMap } from "mobx";
import Resource from "./Resource";
import getIdFactory from "@/app/utils/getIdFactory";
const getId = getIdFactory();

class Tab extends Resource {
  resources: ObservableMap<any, Tab> = this.$$resources;
  constructor() {
    super("tabs");
    this.id = `tab@${getId()}`;
    this.register();
  }
}

export default Tab;
