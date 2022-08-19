import Icon from "@ant-design/icons";
import { Space, } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePickerField, LabelField } from "./form.style";
import { DateSvg } from "../../assets/images/blimobil";
import moment from "moment"

export default function DatePickerForm(props) {
  const {
    required,
    name,
    controlForm,
    placeholder,
    label,
    disabled,
    errors,
    disabledDate
  } = props;

  return (
    <section>
      <div style={{ marginBottom: 12 }}>
        <Space size={4}>
          <LabelField>{label}</LabelField>
          {required && <LabelField style={{ color: "red" }}>*</LabelField>}
        </Space>
      </div>
      <Controller
        {...props}
        rules={{
          required: required,
        }}
        name={name}
        control={controlForm}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePickerField
            disabledDate={disabledDate}
            ref={ref}
            status={!!errors[name] ? "error" : ""}
            onBlur={onBlur}
            onChange={(date, string)=>{
              onChange(moment(date._d).toISOString())
            }}
            value={value ? moment(moment(value).format("YYYY-MM-DD"), "YYYY-MM-DD") : undefined}
            showSearch
            suffixIcon={<Icon component={DateSvg} />}
            disabled={disabled}
            placeholder={placeholder}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          />
        )}
      />
    </section>
  );
}
