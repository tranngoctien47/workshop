import { Space } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { LabelField } from "./form.style";
import InputColor from "./InputColor";

export default function InputColorForm(props) {
  const { required, errors, name, controlForm, placeholder, label, disabled } =
    props;

  return (
    <section>
      <div style={{marginBottom: 12}}>
        <Space size={4}>
            <LabelField>{label}</LabelField>
            {required && <LabelField style={{color: "red"}}>*</LabelField>}
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
          <InputColor
            ref={ref}
            status={!!errors[name] ? "error" : ""}
            onBlur={onBlur}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
    </section>
  );
}
