import { observable, ObservableMap } from "mobx";
import { StateTreeNode } from "./store";

/**
 * Resource is "free node" on the state tree,
 * it doesn't have a stable tree path on the tree, one of its path component is its ID.
 * At creation, it connects to the global store's state,
 * save a ref to corresponding `$$resources` domain in the state object
 *
 * when assigned an ID, it add itself to the `$$resources` map
 *
 * @class Resource
 */
export default class Resource extends StateTreeNode {
  protected $$resources: ObservableMap<any, any>;
  private $$type: string;
  private $$id: string;

  get id() {
    return this.$$id;
  }

  set id(value) {
    this.$$resources.set(value, this);
    this.$$id = value;
  }

  constructor(resourceType: string) {
    super();
    const globalState = this.globalState;
    const $$type = (this.$$type = resourceType);

    if (!globalState.hasOwnProperty($$type)) {
      this.$$resources = globalState[$$type] = observable(new Map());
    }
  }
}
