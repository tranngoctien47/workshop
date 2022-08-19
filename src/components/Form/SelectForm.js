import { CaretDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Space, Select } from "antd";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { BoxDetail, LabelField, SelectField } from "./form.style";

const { Option } = Select;

export default function SelectForm(props) {
  const {
    required,
    name,
    controlForm,
    placeholder,
    label,
    disabled,
    dataSelect = [],
    errors,
    loading = false,
    callback = () => {},
    prefix,
    isDetail= false,
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
          <Fragment>
          <SelectField
            prefix={prefix}
            ref={ref}
            onBlur={onBlur}
            onChange={(key) => {
              !isDetail && onChange(key);
              !isDetail && callback();
            }}
            value={value || undefined}
            showSearch
            suffixIcon={
              loading ? (
                <LoadingOutlined spin={true} />
              ) : (
                <CaretDownOutlined style={{ color: "#666666" }} />
              )
            }
            disabled={disabled}
            placeholder={placeholder}
            status={!!errors[name] ? "error" : ""}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {dataSelect.map((item) => (
              <Option value={item.key} key={item.key}>
                {item.name}
              </Option>
            ))}
          </SelectField>
          { isDetail && <BoxDetail />}
          </Fragment>
        )}
      />
    </section>
  );
}
