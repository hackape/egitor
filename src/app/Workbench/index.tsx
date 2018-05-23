import React from "react";
import style from "./style";
import { observer } from "utils/mobx";
import { IState } from "@/sdk/store";
import Group from "./Group";

type IProps = IState["workbench"] & { className: string };

@observer
class Workbench extends React.Component<IProps> {
  render() {
    const { editorbar } = this.props;
    return (
      <div className={this.props.className}>
        <div className="axis">
          {editorbar.groups.map(group => (
            <Group key={group.id} group={group} />
          ))}
        </div>
        <div>
          <button className="add-group" onClick={() => editorbar.addGroup()}>
            add a group
          </button>
        </div>
      </div>
    );
  }
}

export default style(Workbench);
