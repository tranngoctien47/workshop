import { Radio, Space } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { LabelField } from "./form.style";

export default function RadioForm(props) {
  const { required, errors, name, controlForm, label, disabled, listRadio } =
    props;

  return (
    <section>
      {label && (
        <div style={{ marginBottom: 12 }}>
          <Space size={4}>
            <LabelField>{label}</LabelField>
            {required && <LabelField style={{ color: "red" }}>*</LabelField>}
          </Space>
        </div>
      )}
      <Controller
        {...props}
        rules={{
          required: required,
        }}
        name={name}
        control={controlForm}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Radio.Group disabled={disabled} onBlur={onBlur} value={value} ref={ref} onChange={onChange}>
            {listRadio.map((item) => (
              <Radio value={item.key}>{item.label}</Radio>
            ))}
          </Radio.Group>
        )}
      />
    </section>
  );
}
