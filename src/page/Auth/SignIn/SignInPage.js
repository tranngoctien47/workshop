import { Col, Divider, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { EmailSvg, LockSvg } from "../../../assets/images/blimobil";
import { Redirect, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import { PUBLIC_ROUTE } from "../../../route.constants";
import { SignInCallback as signInCallback } from "../../../callbacks/authorizationCallback";
import { selectFetchingAuthorization } from "../../../reselects/fetchingSelector";
import { schemaSignIn } from "./SignIn.schema";
import {yupResolver} from '@hookform/resolvers/yup';
import { TYPE_USER } from "../../../consts/Enum";
import RouteName from "../../../routeName";

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignInPage() {
  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const isFetching = useSelector(selectFetchingAuthorization());

  const signIn = signInCallback();

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  let { from } = location.state || { from: { pathname: "/dashboard" } };

  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const onSubmit = (data) => {
    signIn(data, (rule, idStore ,idUser)=>{
      if(rule === TYPE_USER.BUYER){
        dispatch(clearMenu());
        return history.push("/403");
      }
      dispatch(login(rule, idStore, idUser));
      dispatch(clearMenu());
      if(rule === TYPE_USER.DEALER){
        return history.push(RouteName.inventory.list);
      }
      if(rule === TYPE_USER.SUPPLIER){
        return history.push(RouteName.inventory.list);
      }
      if(rule === TYPE_USER.ADMIN){
        return history.push(RouteName.order.list);
      }
      if(rule === TYPE_USER.FINANCE){
        return history.push(RouteName.requests.list);
      }
    })
  };

  return (
    <BoxSignin>
      <Space size={14}>
        <BoxTriangle />
        <TextDealer>Blimobil</TextDealer>
      </Space>
      <TitleAuth>Log In</TitleAuth>
      <BlockRoot>
        <BlockForm>
          <ITitle>
            New to Blimobil?{" "}
            <ITitle
              color="#FF8B34"
              style={{
                cursor: "pointer",
              }}
              onClick={()=>history.push(PUBLIC_ROUTE.SIGN_UP)}
            >
              Sign up
            </ITitle>{" "}
            today
          </ITitle>
          <Divider dashed />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[24, 24]}>
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
                  titleRight="Forgot Password?"
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
                    height={54}
                    loading={isFetching}
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
                    Login
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
