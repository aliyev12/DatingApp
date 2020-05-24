import { css } from "styled-components";

export const customTabsStyles = css`
  .tab-panel {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;

    .member-tabset {
      .nav-item.active,
      .nav-item:hover {
        border-bottom: 4px solid #fbcdcf;
        background: none !important;
        color: #333333;
      }

      .nav-item.active > i,
      .nav-item:hover > i {
        color: #a6a6a6;
      }

      .nav-item.active .dropdown-menu,
      .nav-item:hover .dropdown-menu {
        margin-top: 0px;
      }

      .nav-item.active {
        border-bottom: 4px solid #e95420;
        position: relative;
        color: #333333;
      }
      .nav-item.active > i {
        color: #404040;
      }
    }

    .tab-content {
      margin-top: -3px;
      background-color: #fff;
      border: 0;
      border-top: 1px solid #eee;
      padding: 15px 0;
    }
  }
`;
