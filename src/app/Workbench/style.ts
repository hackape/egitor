import styled from "styled-components";

export default comp => styled(comp)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .axis {
    display: flex;
    flex-grow: 1;

    .group {
      flex-grow: 1;
      flex-basis: 0;
      & + .group {
        border-left: 1px solid black;
      }
    }
  }

  .tabbar {
    display: flex;
    height: 40px;
    width: 100%;
    background-color: $tabbar-bg;
    color: #fff;
    align-items: center;

    &.highlight {
      background-color: $tabbar-bg-light;
    }
    .close-tab-btn,
    .add-tab-btn {
      cursor: pointer;
      display: inline-block;
    }

    .add-tab-btn {
      margin-left: auto;
      margin-right: 10px;
      height: 20px;
      width: 20px;
      line-height: 16px;
      border: 1px solid white;
      text-align: center;
      baseline-shift: 30%;
      padding: 0;
    }

    .tab {
      padding: 10px;
      margin: 1px;
      border-bottom: none;
      font-size: 10px;
      background-color: $tab-bg;
      box-shadow: rgba(242, 134, 196, 0.5) 0px -1px inset;
      display: flex;
      min-width: 120px;
      cursor: pointer;

      &.inactive {
        color: #999;
      }

      .close-tab-btn {
        margin-left: auto;
      }
    }
  }
`;
