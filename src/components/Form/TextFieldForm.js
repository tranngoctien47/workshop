import { Space } from "antd";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { IText, ITitle } from "..";
import UIColor from "../../colors";
import {
  BoxDetail,
  LabelField,
  TextField,
  TextNumberField,
  TextPasswordField,
} from "./form.style";

export default function TextFieldForm(props) {
  const {
    required,
    errors,
    name,
    controlForm,
    placeholder,
    label,
    disabled,
    addonBefore = "",
    isNumber = false,
    suffix,
    prefix,
    isPassword,
    titleRight,
    onClickTitleRight,
    isDetail = false,
  } = props;

  const component = ({ onChange, onBlur, value, ref }) => {
    if (isPassword) {
      return (
        <TextPasswordField
          ref={ref}
          addonBefore={addonBefore}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          status={!!errors[name] ? "error" : ""}
          disabled={disabled}
          suffix={suffix}
          prefix={prefix}
          placeholder={placeholder}
          formatter={(number) =>
            `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(number) => number.replace(/\$\s?|(,*)/g, "")}
        />
      );
    }
    if (isNumber) {
      return (
        <TextNumberField
          ref={ref}
          addonBefore={addonBefore}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          status={!!errors[name] ? "error" : ""}
          disabled={disabled}
          suffix={suffix}
          prefix={prefix}
          placeholder={placeholder}
          formatter={(number) =>
            `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(number) => number.replace(/\$\s?|(,*)/g, "")}
        />
      );
    }
    return (
      <TextField
        ref={ref}
        suffix={suffix}
        prefix={prefix}
        addonBefore={addonBefore}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        status={!!errors[name] ? "error" : ""}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  };

  return (
    <section>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space size={4}>
          <LabelField>{label}</LabelField>
          {required && <LabelField style={{ color: "red" }}>*</LabelField>}
        </Space>
        {titleRight && (
          <ITitle
            color={UIColor.blue._3}
            style={{
              cursor: "pointer",
            }}
            onClick={onClickTitleRight}
          >
            {titleRight}
          </ITitle>
        )}
      </div>
      <Controller
        {...props}
        rules={{
          required: required,
        }}
        name={name}
        control={controlForm}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Fragment>
            {component({ onChange, onBlur, value, ref })}
            {isDetail && <BoxDetail />}
          </Fragment>
        )}
      />
      {!!errors[name] && <IText color="red">{errors[name]?.message}</IText>}
    </section>
  );
}
