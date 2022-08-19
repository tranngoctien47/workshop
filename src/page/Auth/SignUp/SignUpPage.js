import { Checkbox, Col, Divider, notification, Row, Space } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ButtonCustom, IText, ITitle } from "../../../components";
import TextFieldForm from "../../../components/Form/TextFieldForm";
import {
  BlockForm,
  BlockRoot,
  BoxSignin,
  BoxTriangle,
  TextDealer,
  TitleAuth,
} from "../Auth.style";
import Icon from "@ant-design/icons";
import { CompanySvg, EmailSvg, LockSvg } from "../../../assets/images/blimobil";
import { PUBLIC_ROUTE } from "../../../route.constants";
import { useHistory } from "react-router";
import UIColor from "../../../colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignup } from "./Signup.schema";
import { SignUpCallback as signUpCallback } from "../../../callbacks/authorizationCallback";
import { useDispatch, useSelector } from "react-redux";
import { selectFetchingAuthorization } from "../../../reselects/fetchingSelector";

export default function SignUpPage() {
  //select
  const isFetching = useSelector(selectFetchingAuthorization());

  //callback
  const signUp = signUpCallback();

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const history = useHistory();

  const onSubmit = (data) => {
    signUp({...data, userRole: "dealer"}, () => history.push(PUBLIC_ROUTE.VERIFY_EMAIL));
  };

  return (
    <BoxSignin>
      <Space size={14}>
        <BoxTriangle />
        <TextDealer>Blimobil</TextDealer>
      </Space>
      <TitleAuth>Register</TitleAuth>
      <BlockRoot>
        <BlockForm>
          <ITitle>
            Already have an account?{" "}
            <ITitle
              color="#FF8B34"
              style={{
                cursor: "pointer",
              }}
              onClick={() => history.push(PUBLIC_ROUTE.SIGN_IN)}
            >
              Log in
            </ITitle>
          </ITitle>
          <Divider dashed />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <TextFieldForm
                  prefix={
                    <Icon
                      style={{ paddingLeft: 8, paddingRight: 8 }}
                      component={CompanySvg}
                    />
                  }
                  required={true}
                  name="companyName"
                  label="Company Name"
                  placeholder="Company Name"
                  errors={errors}
                  controlForm={control}
                />
              </Col>
              <Col span={24}>
                <TextFieldForm
                  prefix={
                    <Icon
                      style={{ paddingLeft: 8, paddingRight: 8 }}
                      component={EmailSvg}
                    />
                  }
                  required={true}
                  name="email"
                  label="Email"
                  placeholder="e.g. contact@blimobil.co.id"
                  errors={errors}
                  controlForm={control}
                />
              </Col>
              <Col span={24}>
                <TextFieldForm
                  isPassword={true}
                  prefix={
                    <Icon
                      style={{ paddingLeft: 8, paddingRight: 8 }}
                      component={LockSvg}
                    />
                  }
                  required={true}
                  name="password"
                  label="Password"
                  placeholder="At least 8 characters. Contains a number"
                  errors={errors}
                  controlForm={control}
                />
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name="conditions"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Checkbox
                      checked={value}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={onChange}
                    >
                      <IText fSize={13}>
                        I agree to the{" "}
                        <ITitle
                          color={UIColor.blue._5}
                          style={{
                            cursor: "pointer",
                          }}
                          // onClick={() => history.push(PUBLIC_ROUTE.SIGN_IN)}
                        >
                          Terms & Conditions
                        </ITitle>
                      </IText>
                    </Checkbox>
                  )}
                />
                {errors.conditions && (
                  <IText color="red" style={{display: "block"}}>
                   {errors.conditions?.message}
                  </IText>
                )}
              </Col>
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: 12,
                  }}
                >
                  <div
                    style={{
                      width: 190,
                      height: 54,
                      background: "#FF8B34",
                      position: "relative",
                    }}
                  />
                  <ButtonCustom
                    loading={isFetching}
                    height={54}
                    style={{
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      zIndex: 2,
                      position: "absolute",
                      bottom: 10,
                      marginRight: 20,
                    }}
                    htmlType="submit"
                    width={190}
                  >
                    CREATE ACCOUNT
                  </ButtonCustom>
                </div>
              </Col>
            </Row>
          </form>
        </BlockForm>
      </BlockRoot>
    </BoxSignin>
  );
}
