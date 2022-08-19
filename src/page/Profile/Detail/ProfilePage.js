import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Image,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import {
  BlimobiGraphic,
  CostEstimateSvg,
  LocationSvg,
} from "../../../assets/images/blimobil";
import {
  BlockHeaderProfile,
  BlockProfileAvatar,
  Content,
  BlockProfile,
  BlockInfomation,
  BlockTab,
  TabProfile,
  ContentTab,
  BoxDescription,
  BoxItemDescription,
} from "./ProfileDetail.style";
import { Box, ButtonCustom, IText, ITitle } from "../../../components";
import UIColor from "../../../colors";
import Icon, { UserOutlined } from "@ant-design/icons";
import ModalChangePassword from "./component/ModalChangePassword";
import useModalChangePassword from "./hooks/useModalChangePassword";
import { PRIVATE_ROUTE } from "../../../route.constants";
import { useHistory } from "react-router";
import { selectFetchingMerchant, selectFetchingUser } from "../../../reselects/fetchingSelector";
import { selectUserDeatail } from "../../../reselects/userSelector";
import { GetUserDetailCallback as getUserDetailCallback } from "../../../callbacks/userCallback";
import { useSelector } from "react-redux";
import { textEmpty } from "../../../utils/common";

export default function ProfilePage() {
  const [isModalVisible, setIsModalVisible] = useModalChangePassword();
  const history = useHistory();

  // select
  const isFetching = useSelector(selectFetchingUser());
  const userData = useSelector(selectUserDeatail());
  const idUser = useSelector(state => state.Auth.idUser)
  
  // callback
  const getUserDetail = getUserDetailCallback();

  useEffect(() => {
    if(idUser){
      getUserDetail && getUserDetail(idUser)
    }
  }, [idUser]);

  const onOpenChangePassword = () => setIsModalVisible(true);

  const onNavigateEditPrifle = () => history.push(PRIVATE_ROUTE.SET_UP_ACCOUNT);

  const ItemDescription = ({ label, value }) => (
    <BoxItemDescription>
      <IText>{label}</IText>
      <IText strong fSize={14}>
        {textEmpty(value)}
      </IText>
    </BoxItemDescription>
  );

  return (
    <Content>
      <BlockHeaderProfile>
        <Image width="50%" src={BlimobiGraphic} preview={false} />
      </BlockHeaderProfile>
      <BlockProfile>
        <Row gutter={[60, 12]}>
          <Col span={6} offset={2}>
            <BlockProfileAvatar>
              <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
                <Row gutter={[12, 30]}>
                  <Col span={24}>
                    <Space size={30} direction="vertical">
                      <Avatar
                        style={{ width: 192, height: 192 }}
                        src="https://joeschmoe.io/api/v1/20"
                      />
                      <Space size={8} direction="vertical">
                        <ITitle fSize={24}>{textEmpty(userData.fullName)}</ITitle>
                        <IText fSize={12}>{textEmpty(userData.email)}</IText>
                        <Box>
                          <Icon component={LocationSvg} />
                          <IText fSize={12} color={UIColor.sky._3}>
                            {textEmpty(userData.location)}
                          </IText>
                        </Box>
                      </Space>
                      <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size={8}
                      >
                        <ButtonCustom
                          onClick={onNavigateEditPrifle}
                          bgColor={UIColor.gray._3}
                          isClipPath={true}
                        >
                          EDIT PROFILE
                        </ButtonCustom>
                        <ButtonCustom
                          onClick={onOpenChangePassword}
                          bgColor={UIColor.primary}
                          isClipPath={true}
                        >
                          CHANGE PASSWORD
                        </ButtonCustom>
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </Skeleton>
            </BlockProfileAvatar>
          </Col>
          <Col span={14}>
            <BlockInfomation>
              <BlockTab>
                <TabProfile active={true}>
                  <Icon
                    component={CostEstimateSvg}
                    style={{ color: UIColor.blue._3 }}
                  />
                  <IText color={UIColor.primary}>Information</IText>
                </TabProfile>
              </BlockTab>
              <ContentTab>
                <Space size={12} align="baseline">
                  <UserOutlined
                    style={{
                      fontSize: 18,
                      border: "1px solid #666666",
                      borderRadius: 2,
                    }}
                  />
                  <ITitle fSize={24}>Personal Information</ITitle>
                </Space>
                <BoxDescription>
                  <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
                    <div style={{ width: "100%", textAlign: "right" }}>
                      <Button
                        onClick={onNavigateEditPrifle}
                        style={{ color: UIColor.primary, fontSize: 13 }}
                        type="text"
                      >
                        EDIT
                      </Button>
                    </div>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <ItemDescription
                          label="Your Name"
                          value={userData.fullName}
                        />
                      </Col>
                      <Col span={24}>
                        <ItemDescription
                          label="Phone Number"
                          value={userData.phoneNumber}
                        />
                      </Col>
                      <Col span={8}>
                        <ItemDescription label="City" value={userData.city} />
                      </Col>
                      <Col span={8}>
                        <ItemDescription
                          label="ZIP Code"
                          value={userData.code}
                        />
                      </Col>
                      <Col span={24}>
                        <ItemDescription
                          label="Address"
                          value={userData.address}
                        />
                      </Col>
                    </Row>
                    <Divider dashed />
                    <Checkbox defaultChecked="cheked">
                      <IText>
                        Billing Address is the same delivery address
                      </IText>
                    </Checkbox>
                  </Skeleton>
                </BoxDescription>
              </ContentTab>
            </BlockInfomation>
          </Col>
        </Row>
      </BlockProfile>
      <ModalChangePassword
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </Content>
  );
}
