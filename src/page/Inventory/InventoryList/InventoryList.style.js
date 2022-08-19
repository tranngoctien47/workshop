import { Alert } from "antd";
import styled from "styled-components";
import { device } from "../../../consts/Enum";

export const BoxEllipsis = styled.div`
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #EEEEEE;
    cursor: pointer;
`;

export const AlertEmpty = styled.div`
    width: 100%;
`

export const RowStyled = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.gap}px;
`

export const BlockEmptyInventory = styled.div`
    width: 100%;
    min-height: calc(100vh - 64px - 68px - 81px - 46px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
    @media ${device.xs} {
        min-height: auto;
        margin-top: 46px;
        padding: 24px;
    }
`;

export const AlertStyled = styled(Alert)`
    width: 98%;
    padding: 14px 24px;

    @media ${device.xs} {
        width: 100%;
    }
`;

export const BoxAlert = styled.div`
    width: 100%;
    padding: 0px;
    @media ${device.xs} {
        padding: 0px 14px;
    }
`;