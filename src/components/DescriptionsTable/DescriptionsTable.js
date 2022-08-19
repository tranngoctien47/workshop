import { Space } from "antd";
import React, { Fragment, useMemo } from "react";
import { IText, ITitle } from "..";
import {
  BoxDescription,
  BoxRoot,
  HeaderBox,
  ItemRowDescription,
} from "./DescriptionsTable.style";
import Icon from "@ant-design/icons";

export default function DescriptionsTable({
  data = [],
  columns = 1,
  isHeader = false,
  titleHeader = "",
  isBoard = true,
  componentItem = undefined,
}) {
  const templateColumn = useMemo(() => {
    let result = "";
    for (let i = 1; i <= columns; i++) {
      result += "1fr ";
    }
    return result;
  }, [columns]);

  return (
    <Fragment>
      {isHeader && (
        <HeaderBox>
          <ITitle>{titleHeader}</ITitle>
        </HeaderBox>
      )}
      <BoxRoot columns={templateColumn}>
        {data.map((itemRoot, indexRoot) => (
          <BoxDescription isBorderRight={isBoard || indexRoot === data.length - 1} isBorderLeft={indexRoot === 0}>
            {itemRoot.map((el, idx) => (
              <ItemRowDescription
                isBorderBottom={isBoard &&  idx !== itemRoot.length - 1}
              >
                {!componentItem ? (
                  <Fragment>
                    <IText enable={!el.value} color="#444444">{el.label ? el.label: "None" }</IText>
                    <Space>
                      {el.icon && <Icon component={el.icon} />}
                      <ITitle enable={!el.value}>{el.value ? el.value: "None"}</ITitle>
                    </Space>
                  </Fragment>
                ) : (
                  componentItem(el)
                )}
              </ItemRowDescription>
            ))}
          </BoxDescription>
        ))}
      </BoxRoot>
    </Fragment>
  );
}
