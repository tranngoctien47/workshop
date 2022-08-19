import React, { Fragment, useMemo } from "react";
import Icon from "@ant-design/icons";
import { Space, Typography } from "antd";
import UIColor from "../../colors";
import { startCase } from "lodash";
import styled from "styled-components";
import { device } from "../../consts/Enum";

const { Title, Text } = Typography;

const styleSubMenu = {color: "#666666", fontSize: 12};

const BoxBreadcrumb = styled.div`
  padding: 18px 26px;

  @media ${device.xs} { 
    padding: 14px 16px;
  }
`;

export default function BreadcrumbDashboard(props) {
  const { icon, breadcrumb } = props;

  const arrayBreadcrumb = useMemo(() => {
    return breadcrumb.split("/");
  }, [breadcrumb]);

  return (
    <BoxBreadcrumb>
      <Space align="baseline" size={12}>
        {icon && <Icon
          component={icon}
          width={18}
          height={18}
          style={{ color: "#FF8B34" }}
        />}
        {arrayBreadcrumb.map((item, index) =>
          index === 0 ? (
            <Title
              style={{
                textTransform: "uppercase",
                color: UIColor.primary,
                letterSpacing: 3,
              }}
              level={5}
            >
              {`${startCase(item)}`}
            </Title>
          ) : 
          <Fragment>
            <Text style={{color: "#666666"}}>/</Text>
            <Text style={styleSubMenu}>{`${startCase(item)}`}</Text>
          </Fragment>
        )}
      </Space>
    </BoxBreadcrumb>
  );
}
