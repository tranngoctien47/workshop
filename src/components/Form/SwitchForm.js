import { Switch } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export default function SwitchForm(props) {
    const { required, errors, name, controlForm, disabled, } =
        props;
    return (
        <Controller
            {...props}
            rules={{
                required: required,
            }}
            name={name}
            control={controlForm}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Switch
                    disabled={disabled}
                    onBlur={onBlur}
                    checked={value}
                    ref={ref}
                    onChange={onChange}
                />
            )}
        />
    );
}
