import { Divider, Space } from "antd";
import React from "react";
import UIColor from "../../../colors";
import { IText, ITitle } from "../../../components";
import { BlockForm, BlockRoot, BoxSignin } from "../Auth.style";
import Icon from "@ant-design/icons";
import { NextSvg } from "../../../assets/images/blimobil";
import { useHistory } from "react-router";
import { PUBLIC_ROUTE } from "../../../route.constants";

export default function VerifyEmailPage() {
  const history = useHistory();
  return (
    <BoxSignin mWidth={536}>
      <BlockRoot>
        <BlockForm mHeight={304}>
          <Space direction="vertical" size={26}>
            <ITitle fSize={24}>Thanks for registering!</ITitle>
            <IText fSize={14} color={UIColor.gray._1}>
              Please check the entered email and click{" "}
              <IText fSize={14} color={UIColor.gray._2} strong>
                verify link
              </IText>{" "}
              to start using Blimobil plarform.
            </IText>
          </Space>
          <Divider dashed />
          <Space align="baseline">
            <Icon component={NextSvg} />
            <IText fSize={13} color={UIColor.gray._3}>
              Redirect to{" "}
              <IText
                style={{
                  cursor: "pointer",
                }}
                onClick={() => history.push(PUBLIC_ROUTE.SIGN_IN)}
                strong
                fSize={13}
                color={UIColor.orange._5}
              >
                Log In
              </IText>{" "}
              page in 10 seconds
            </IText>
          </Space>
        </BlockForm>
      </BlockRoot>
    </BoxSignin>
  );
}
