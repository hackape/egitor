import {
  ComponentType,
  ComponentState,
  Component,
  ComponentClass,
  ClassType,
  SFC
} from "react";
import { inject } from "mobx-react";
import { IState } from "@/sdk/store"; // it's harmless to import type info, won't generate `require(...)`

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [K in T]: K } &
  { [K in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends string> = Pick<T, Diff<keyof T, K>>;

interface IMapStateToProps<I> {
  (state: IState, nextProps: any): I;
}

const INTERNAL_PROPERTY_NAMES = ["$mobx", "toString", "$treenode", "toJSON"];

export default function connect<Res>(mapStateToProps: IMapStateToProps<Res>) {
  function connectDecorator<
    P,
    T extends Component<P, ComponentState>,
    C extends ComponentClass<P>
  >(component: ClassType<P, T, C> | SFC<P>): ComponentType<Omit<P, keyof Res>> {
    return inject(({ state }, nextProps: P) => {
      const props = mapStateToProps(state, nextProps);
      const ownProps = {};
      Object.getOwnPropertyNames(props)
        .filter(name => !INTERNAL_PROPERTY_NAMES.includes(name))
        .forEach(name => {
          ownProps[name] = props[name];
        });
      return ownProps;
    })(component) as any;
  }
  return connectDecorator;
}
