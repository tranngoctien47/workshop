import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const TextStatus = styled(Text)`
    font-weight: bold;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    height: 100%;
`

export const MenuContent = styled.div`
    padding: 24px;
    height: 100%;
    background-color: #F9F9F9;
`;

export const BlockIconMenu = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content:center;
    align-items: center;
`;

export const MenuItemContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    #block-icon-menu{
        background-color: ${props => props.isActive ? "#EDF2FC" : "transparent"};
    }
    :hover{
        span{
            color: #0D3E9A !important;
        }
        #block-icon-menu{
            background-color: #EDF2FC;
        }
    }
`;

export const DetailContent = styled.div`
    padding: 24px;
    height: 100%;
    background-color: white;
    border-left: 1px solid #EEEEEE;
    gap: 30px;
    display: flex;
    flex-direction: column;
`

export const BoxPlatformFee = styled.div`
    padding: 16px 24px;
    width: 100%;
    height: 100%;
    background-color: #DEF4FE;
    border: 1px solid #50BDEA;
`