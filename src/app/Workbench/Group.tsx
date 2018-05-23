import React from "react";
import { observer } from "utils/mobx";
import { default as IGroup } from "@/sdk/Group";

@observer
class Group extends React.Component<{ group: IGroup }> {
  state = {
    dragEnterTabBar: false
  };

  getGroupDropEventHandlers() {
    return {
      onDragOver: e => e.preventDefault(),
      onDragEnter: e => {
        this.setState({ dragEnterTabBar: true });
      },
      onDragLeave: e => {
        this.setState({ dragEnterTabBar: false });
      },
      onDragEnd: e => {
        this.setState({ dragEnterTabBar: false });
      },
      onDrop: e => {
        this.setState({ dragEnterTabBar: false });
        const tabId = e.dataTransfer.getData("tabId");
        this.props.group.handleTabDrop(tabId);
      }
    };
  }

  render() {
    const { group } = this.props;
    return (
      <div className="group">
        <div
          className={`tabbar ${this.state.dragEnterTabBar ? "highlight" : ""}`}
          {...this.getGroupDropEventHandlers()}
          onDoubleClick={() => group.addTab()}
        >
          {group.tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab ${tab.isActive ? "active" : "inactive"}`}
              draggable
              onDragStart={e => {
                e.dataTransfer.setData("tabId", tab.id);
              }}
              onDragOver={e => {
                console.log("drag on tab");
                e.stopPropagation();
              }}
              onClick={() => tab.activate()}
            >
              <span className="tab-title">tabID: {tab.id}</span>
              <div
                className="close-tab-btn"
                onClick={e => {
                  tab.destroy();
                  e.stopPropagation();
                }}
              >
                x
              </div>
            </div>
          ))}
          <div className="add-tab-btn" onClick={() => group.addTab()}>
            +
          </div>
        </div>
        <span>groupID: {group.id}</span>
        <span>
          activeTabId: {group.activeTab ? group.activeTab.id : "null"}
        </span>
      </div>
    );
  }
}

export default Group;
