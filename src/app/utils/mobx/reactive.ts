import { extendObservable, observable, computed, action } from "mobx";

function reactive<T extends Function>(ctor: T) {
  for (let key in ctor.prototype) {
    if (ctor.prototype.hasOwnProperty(key)) {
      if (key === "constructor") continue;
      const desc = Object.getOwnPropertyDescriptor(ctor.prototype, key);
      if (!desc) {
        observable(ctor.prototype, key, desc);
      } else if (desc.get) {
        computed(ctor.prototype, key, desc);
      } else if (desc.value && typeof desc.value === "function") {
        action(ctor.prototype, key, desc);
      }
    }
  }

  var classProxy: any = function() {
    const args = Array.from(arguments);
    var _this = new (ctor as any)(...args);
    const partial = {};
    for (let key in _this) {
      if (_this.hasOwnProperty(key)) {
        partial[key] = _this[key];
        delete _this[key];
      }
    }

    extendObservable(_this, partial);
    console.log(_this);
    return _this;
  };

  classProxy.prototype = ctor.prototype;

  return classProxy as T;
}

export default reactive;
