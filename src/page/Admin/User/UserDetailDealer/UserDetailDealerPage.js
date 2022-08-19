import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Image,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {
  BlimobiGraphic,
  CostEstimateSvg,
  LocationSvg,
  StoreInfoSvg,
} from "../../../../assets/images/blimobil";
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
  DescriptionsItem,
} from "./UserDeatailDealer.style";
import {
  Box,
  ButtonCustom,
  IText,
  ITitle,
  PageHeaderCustom,
} from "../../../../components";
import UIColor from "../../../../colors";
import Icon, {
  CaretDownOutlined,
  CheckCircleOutlined,
  CloseCircleFilled,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PRIVATE_ROUTE } from "../../../../route.constants";
import { useHistory, useLocation, useParams } from "react-router";
import useModalChangePassword from "../../../Profile/Detail/hooks/useModalChangePassword";
import ModalChangePassword from "../../../Profile/Detail/component/ModalChangePassword";
import { TAB_INFO, TYPE_PAGE } from "../../../../consts/Enum";
import { GetUserDetailCallback as getUserDetailCallback } from "../../../../callbacks/userCallback";
import {
  GetMerchantDetailCallback as getMerchantDetailCallback,
  UpdateStatusMerchantCallback as updateStatusMerchantCallback,
} from "../../../../callbacks/merchantCallback";
import { useSelector } from "react-redux";
import { selectMerchantDetail } from "../../../../reselects/merchantSelector";
import { selectUserDeatail } from "../../../../reselects/userSelector";
import {
  selectFetchingMerchant,
  selectFetchingUser,
} from "../../../../reselects/fetchingSelector";
import {
  parseDateColumnTable,
  statusDeadler,
  textEmpty,
} from "../../../../utils/common";
import { startCase, upperFirst, random, upperCase } from "lodash";
import { coutries } from "../../../Store/data";

export default function UserDetailDealerPage() {
  const [tab, setTab] = useState(TAB_INFO.INFORMATION);
  const [isModalVisible, setIsModalVisible] = useModalChangePassword();
  const { state } = useLocation();
  const { id } = useParams();

  // select
  const isFetchingUser = useSelector(selectFetchingMerchant());
  const isFetchingMercahnt = useSelector(selectFetchingUser());
  const merchantData = useSelector(selectMerchantDetail());
  const userData = useSelector(selectUserDeatail());

  // callback
  const getUserDetail = getUserDetailCallback();
  const getMerchantDetail = getMerchantDetailCallback();
  const updateStatusMerchant = updateStatusMerchantCallback();

  useEffect(() => {
    getUserDetail && getUserDetail(id);
    getMerchantDetail && getMerchantDetail(state.merchantCode);
  }, [id]);

  const ItemDescription = ({ label, value }) => (
    <BoxItemDescription>
      <IText>{label}</IText>
      <IText strong fSize={14}>
        {value}
      </IText>
    </BoxItemDescription>
  );

  const onChangeTab = (keyTab) => setTab(keyTab);

  const onChangeStatus = (key) => {
    updateStatusMerchant({ action: key }, merchantData.code, () => {
      getMerchantDetail(merchantData.code);
    });
  };

  const contentTab = (key) => {
    switch (key) {
      case TAB_INFO.INFORMATION: {
        return (
          <ContentTab>
            <Space size={12} align="baseline">
              <UserOutlined
                style={{
                  fontSize: 18,
                  border: "1px solid #666666",
                  borderRadius: 2,
                }}
              />
              <ITitle fSize={24}>{`${upperFirst(
                state.type
              )} Information`}</ITitle>
            </Space>
            <BoxDescription>
              <Skeleton
                loading={isFetchingMercahnt || isFetchingUser}
                paragraph={{ rows: 6 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <ItemDescription
                      label="Company Registration No."
                      value={textEmpty(userData.companyRegistration)}
                    />
                  </Col>
                  <Col span={24}>
                    <ItemDescription
                      label="Nationality"
                      value={textEmpty(userData.nationality)}
                    />
                  </Col>
                  <Col span={24}>
                    <ItemDescription
                      label="Phone Number"
                      value={textEmpty(userData.phoneNumber)}
                    />
                  </Col>
                  <Col span={24}>
                    <ItemDescription
                      label="Address"
                      value={textEmpty(userData.address)}
                    />
                  </Col>
                </Row>
              </Skeleton>
            </BoxDescription>
          </ContentTab>
        );
      }
      case TAB_INFO.STORE: {
        return (
          <ContentTab>
            <Space size={12} align="baseline">
              <Icon component={StoreInfoSvg} />
              <ITitle fSize={24}>{`${upperFirst(state.type)} Store`}</ITitle>
            </Space>
            <BoxDescription style={{ padding: "15px 30px 30px 30px" }}>
              <Skeleton
                loading={isFetchingMercahnt || isFetchingUser}
                paragraph={{ rows: 6 }}
              >
                <Row gutter={[16, 16]}>
                  <div style={{ width: "100%", textAlign: "right" }}>
                    <Tag
                      color="#EEEEEE"
                      style={{ color: "#666666", fontWeight: 600 }}
                    >
                      UNVERIFIED
                    </Tag>
                  </div>
                  <Col span={24}>
                    <ItemDescription
                      label="Country"
                      value={
                        textEmpty(
                          coutries.find((el) => el.key === merchantData.country)
                            ?.flag
                        ) +
                        " " +
                        textEmpty(
                          coutries.find((el) => el.key === merchantData.country)
                            ?.name
                        )
                      }
                    />
                  </Col>
                  <Col span={9}>
                    <ItemDescription
                      label="City"
                      value={textEmpty(merchantData.city)}
                    />
                  </Col>
                  <Col span={9}>
                    <ItemDescription
                      label="ZIP Code"
                      value={textEmpty(merchantData.code)}
                    />
                  </Col>
                  <Col span={9}>
                    <ItemDescription
                      label="Contact Name"
                      value={textEmpty(merchantData.contactName)}
                    />
                  </Col>
                  <Col span={9}>
                    <ItemDescription
                      label="Store Phone Number"
                      value={
                        merchantData.phoneCode +
                        " " +
                        textEmpty(merchantData.phone)
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <ItemDescription
                      label="Address"
                      value={textEmpty(merchantData.addressStore)}
                    />
                  </Col>
                </Row>
              </Skeleton>
            </BoxDescription>
          </ContentTab>
        );
      }
    }
  };

  return (
    <Fragment>
      <PageHeaderCustom
        type={TYPE_PAGE.DETAIL}
        title={`${upperCase(state.type)} PROFILE`}
        subTitle=""
        extra={
          <Space size={32}>
            <Space>
              <Badge size="small" dot>
                <MessageOutlined style={{ fontSize: 16, color: "white" }} />
              </Badge>
            </Space>
            {merchantData?.rejected ? (
              <ButtonCustom
                type="text"
                height={52}
                rounded={0}
                bgColor={UIColor.orange._5}
                disabled={!merchantData}
                onClick={() => onChangeStatus("approve")}
                icon={
                  <CheckCircleOutlined
                    style={{ fontSize: 18, marginRight: 6 }}
                  />
                }
              >
                VERIFY STORE
              </ButtonCustom>
            ) : (
              <Space size={0}>
                {!merchantData?.approved && merchantData   && (
                  <ButtonCustom
                    type="text"
                    height={52}
                    rounded={0}
                    bgColor={UIColor.orange._5}
                    onClick={() => onChangeStatus("approve")}
                    icon={
                      <CheckCircleOutlined
                        style={{ fontSize: 18, marginRight: 6 }}
                      />
                    }
                  >
                    VERIFY STORE
                  </ButtonCustom>
                )}
                <ButtonCustom
                  type="text"
                  height={52}
                  rounded={0}
                  bgColor={UIColor.gray._5}
                  disabled={!merchantData}
                  onClick={() => onChangeStatus("reject")}
                  icon={
                    <CloseCircleFilled
                      style={{ fontSize: 18, marginRight: 6 }}
                    />
                  }
                >
                  {merchantData ? "REJECT STORE" : "NO STORE"}
                </ButtonCustom>
              </Space>
            )}
            <div style={{ paddingRight: 12 }}>
              <Space align="baseline" size={24}>
                <Badge size="small" style={{ color: UIColor.orange._5 }} dot />
                <ITitle fSize={14} color="white">
                  {startCase(statusDeadler(merchantData))}
                </ITitle>
              </Space>
            </div>
          </Space>
        }
      />
      <Content>
        <BlockHeaderProfile
          bgColor={
            tab === TAB_INFO.INFORMATION ? UIColor.geekBlue._2 : UIColor.primary
          }
        >
          <Image width="50%" src={BlimobiGraphic} preview={false} />
        </BlockHeaderProfile>
        <BlockProfile>
          <Row gutter={[60, 12]}>
            <Col span={7} offset={1}>
              <BlockProfileAvatar>
                <Skeleton
                  loading={isFetchingMercahnt || isFetchingUser}
                  paragraph={{ rows: 6 }}
                >
                  <Row gutter={[12, 30]}>
                    <Col span={24}>
                      <Space
                        size={30}
                        direction="vertical"
                        style={{ width: "100%" }}
                      >
                        <Avatar
                          style={{ width: 192, height: 192 }}
                          src={`https://joeschmoe.io/api/v1/${random(6)}`}
                        />
                        <Space size={8} direction="vertical">
                          <ITitle fSize={24}>
                            {textEmpty(userData.fullName)}
                          </ITitle>
                          <IText fSize={12}>{textEmpty(userData.email)}</IText>
                        </Space>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <DescriptionsItem>
                            <IText>Date Registered</IText>
                            <ITitle>
                              {parseDateColumnTable(userData.createdAt)}
                            </ITitle>
                          </DescriptionsItem>
                          <DescriptionsItem>
                            <IText>Last Visited</IText>
                            <ITitle>
                              {parseDateColumnTable(userData.verifyExpiredAt)}
                            </ITitle>
                          </DescriptionsItem>
                        </Space>
                        <Space
                          direction="vertical"
                          style={{ maxWidth: 200, width: "100%" }}
                          size={8}
                        >
                          <ButtonCustom
                            bgColor={UIColor.primary}
                            isClipPath={true}
                          >
                            RESET PASSWORD
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
                  <TabProfile
                    onClick={() => onChangeTab(TAB_INFO.INFORMATION)}
                    active={tab === TAB_INFO.INFORMATION}
                  >
                    <Icon
                      component={CostEstimateSvg}
                      style={{
                        color:
                          tab === TAB_INFO.INFORMATION
                            ? UIColor.blue._3
                            : "white",
                      }}
                    />
                    <IText
                      color={
                        tab === TAB_INFO.INFORMATION ? UIColor.primary : "white"
                      }
                    >
                      Information
                    </IText>
                  </TabProfile>
                  <TabProfile
                    style={{ cursor: merchantData ? "pointer" : "no-drop" }}
                    onClick={() => merchantData && onChangeTab(TAB_INFO.STORE)}
                    active={tab === TAB_INFO.STORE}
                  >
                    <Icon
                      component={StoreInfoSvg}
                      style={{ color: "#0D3E9A" }}
                    />
                    <IText color={UIColor.primary}>Store</IText>
                    <Tag color={UIColor.orange._5}>New Resquest</Tag>
                  </TabProfile>
                </BlockTab>
                {contentTab(tab)}
              </BlockInfomation>
            </Col>
          </Row>
        </BlockProfile>
        <ModalChangePassword
          visible={isModalVisible}
          setVisible={setIsModalVisible}
        />
      </Content>
    </Fragment>
  );
}
