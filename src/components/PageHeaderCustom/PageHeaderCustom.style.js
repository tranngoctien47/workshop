import { PageHeader, Typography } from "antd";
import styled from "styled-components";
import UIColor from "../../colors";

export const PageHeaderStyled = styled(PageHeader)`
    &.ant-page-header{
        background-color: ${UIColor.primary};
        padding: 0px;
        position: sticky;
        top: 0;
        z-index: 20;
    }
    .ant-page-header-heading-left{
        padding: 6px 16px;
    }
    .ant-page-header-heading-extra{
        margin: 0px;
    }
    .ant-page-header-heading-title{
        color: white;
        font-size: 14px;
    }
    .ant-page-header-heading-sub-title{
        font-size: 13px;
        font-weight:400;
        color: #f0f0f0;
    }
`;
