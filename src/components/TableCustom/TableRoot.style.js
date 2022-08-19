import { Button, Input, Select, Table, Tag } from "antd";
import styled from "styled-components";

export const TableStyled = styled(Table)`
    .ant-table-cell{
        color: #666666;
    }
    .ant-table-thead > tr > th{
        background-color: #EEEEEE;
        font-size: 12px;
        font-weight: 600;
        color: #666666;
    }
    .ant-table-tbody > tr > td{
        border-bottom: unset;
    }
    .ant-table-row{
        cursor: pointer;
    }
    .ant-table-footer{
        background: white;
    }
    .ant-table-cell{
        font-size: 13px;
        font-weight: 400;
        color: #222222;
    }
`

export const BoxFilter = styled.div`
    display: grid;
    grid-template-columns: ${props => props.gridColumns ? props.gridColumns : "2fr 1fr 1fr 120px"};
    border-width: 1px 0px;
    border-style: solid;
    border-color: #EEEEEE;
`;

export const SearchTable = styled(Input)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-right: 1px solid #EEEEEE !important;
`;

export const SelectFilter = styled(Select)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-right: 1px solid #EEEEEE !important;
    .ant-select-selector{
        height: 50px !important;
        display: flex;
        align-items: center;
    }
    .ant-select-selection-placeholder{
        color: #222222;
    }
`;

export const TagCountColumn = styled(Tag)`
    color: #666666 !important;
    border-radius: 4px;
    height: 24px;
`;

export const ButtonAdd = styled(Button)`
    &.ant-btn{
        background-color: ${props => props.color ? props.color : "#50BDEA"};
        color: white;
        text-transform: uppercase;
        height: 100%;
        font-weight:600;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        :hover{
            background-color: ${props => props.color ? props.color : "#50BDEA"};
            color: white;
            opacity: 0.5
        }
    }
`;

export const ItemFilter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 10px 12px;
    font-weight: ${props => props.active ? 600 : 400};
    background-color: ${props => props.active ? "#0D3E9A" : "transparent"};
    clip-path: polygon(0 0, 88% 0, 100% 17%, 100% 100%, 20% 100%, 0 100%, 0% 20%);
    min-width: 125px;
    transition: all 0.35s ease-in-out 0s;
    cursor: pointer;
    .ant-typography{
        color: ${props => props.active ? "white" : "#444444"};
        letter-spacing: 1px;
    }
`;

export const BoxFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;