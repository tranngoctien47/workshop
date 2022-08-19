import { DatePicker, Input, InputNumber, Select } from "antd";
import styled from "styled-components";

export const TextField  = styled(Input)`
    height: 48px;
    .ant-input-group{
        height: 48px;
    }
    .ant-input-group .ant-input {
        height: 100%;
    }
    .ant-input-group-addon{
        background-color: white;
        font-weight: 600;
    }
`;


export const TextPasswordField  = styled(Input.Password)`
    height: 48px;
    width: 100%;
    .ant-input-password-input-wrap{
        height: 48px;
    }
    .ant-input-password-input {
        height: 100%;
    }
`;

export const TextNumberField  = styled(InputNumber)`
    height: 48px;
    width: 100%;
    .ant-input-number-input-wrap{
        height: 48px;
    }
    .ant-input-number-input {
        height: 100%;
    }
    .ant-input-group-addon{
        background-color: white;
        font-weight: 600;
    }
`;

export const SelectField = styled(Select)`
    width: 100%;
    .ant-select-selector,.ant-select-selection-search-input{
        height: 48px !important;
        display: flex;
        align-items: center;
    }
    .ant-select-selection-item{
        font-weight: 600;
    }
`

export const DatePickerField = styled(DatePicker)`
    width: 100%;
    height: 48px;
`

export const LabelField = styled.label`
    color: #444444;
    font-size: 14px;
    font-weight: 400;
`;

export const BlockSelectColor = styled.div`
    background-color: #D2D1D4;
    border: 1px solid ${props => props.status ? "red": "#D2D1D4"};
    background: #FFFFFF;
    height: 48px;
    padding: 4px 11px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
    :hover{
        border-color: #40a9ff;
    }
`;

export const BoxDetail = styled.div`
    width: 100%;
    height: 48px;
    background-color: transparent;
    position: absolute;
    bottom: 0px;
`