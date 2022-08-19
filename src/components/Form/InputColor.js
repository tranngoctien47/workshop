import { Button, Popover, Space } from "antd";
import React, { Fragment, useState } from "react";
import { SketchPicker } from "react-color";
import { IText } from "..";
import { IconColorSvg } from "../../assets/images/blimobil";
import { BlockSelectColor } from "./form.style";
import Icon from "@ant-design/icons";

export default function InputColor(props) {
  const { placeholder, status, ref, onBlur, value, onChange } = props;

  const onChangeComplete = (color) => onChange(color.hex);

  return (
    <Fragment>
      <Popover
        trigger="click"
        content={() => (
          <SketchPicker onBlur={onBlur} ref={ref} color={value} onChangeComplete={onChangeComplete} />
        )}
      >
        <BlockSelectColor status={status}>
          <Space>
            {value && (
              <div style={{ width: 20, height: 20, background: value, border: "1px solid #D2D1D4" }} />
            )}
            <IText color={value ? "black" : "#bfbfbf"} fSize={14}>
              {value ? value : placeholder}
            </IText>
          </Space>
          <Icon component={IconColorSvg} />
        </BlockSelectColor>
      </Popover>
    </Fragment>
  );
}
