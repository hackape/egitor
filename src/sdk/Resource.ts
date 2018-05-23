import { ObservableMap, action } from "mobx";
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
  id: string;

  constructor(resourceType: string) {
    super();

    this.$$type = resourceType;
    if (!this.globalState.hasOwnProperty(this.$$type)) {
      throw `resources domain ${this.$$type} has not been initialized yet`;
    }

    this.$$resources = this.globalState[this.$$type];
  }

  @action("register resource")
  register() {
    this.$$resources.set(this.id, this);
  }
}
