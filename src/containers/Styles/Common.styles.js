import styled from "styled-components";
import { palette } from "styled-theme";
import Buttons from "@iso/components/uielements/button";
import Table from "@iso/containers/Tables/AntTables/AntTables.styles";

const TagItem = styled.span`
  background: #dceeff;
  border-radius: 10px;
  padding: 4px 8px;
  display: inline-block;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: #0085ff;
  margin: 4px;
`;

const TableWrapper = styled(Table)`
  .ant-table-thead > tr > th {
    color: ${palette("secondary", 2)};
    font-size: 14px;
    background-color: ${palette("secondary", 1)};
    border-bottom: 0;

    &.ant-table-column-sort {
      background: ${palette("secondary", 1)};
      margin: ${(props) =>
        props["data-rtl"] === "rtl" ? "0 4px 0 0" : "0 0 0 4px"};
    }
  }
  .ant-table-tbody > tr > td {
    font-size: 14px;
    color: ${palette("text", 3)};
    border-bottom: 1px solid ${palette("border", 0)};

    a {
      color: ${palette("primary", 0)};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }
  }
  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette("primary", 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.draft {
    background-color: ${palette("warning", 0)};
  }

  &.publish {
    background-color: ${palette("success", 0)};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonHolders = styled.div``;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette("text", 0)};
  margin: 5px 0;
`;

const ActionBtn = styled(Buttons)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 17px;
      color: ${palette("text", 1)};
    }

    &:hover {
      i {
        color: inherit;
      }
    }
  }
`;

const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 13px;
  color: ${palette("text", 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette("primary", 0)};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette("error", 0)};

        &:hover {
          color: ${palette("error", 2)};
        }
      }
    }
  }
`;
const ComponentFilter = styled.div`
  display: flex;
  gap: 0 10px;
  height: 32px;
  align-items: center;
`;
const Form = styled.div``;

export {
  ActionBtn,
  Fieldset,
  Label,
  Form,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
  TagItem,
  ComponentFilter,
};
