import { LoadingOutlined, MessageOutlined } from "@ant-design/icons";
import {
  Badge,
  Col,
  Divider,
  Image,
  List,
  Row,
  Skeleton,
  Space,
  Spin
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import UIColor from "../../../colors";
import {
  Box,
  ButtonCustom,
  CarouselCustom,
  IText,
  ITitle,
  LineCar,
  ListCustom,
  PageHeaderCustom
} from "../../../components";
import {
  CAR_STATUS_VALUE,
  CHAT_TYPE_CREATE,
  TYPE_CHAT_DEALER,
  TYPE_PAGE
} from "../../../consts/Enum";
import { TextStatus } from "../../Inventory/InventoryDetail/InventoryDetail.style";
import { camelCase } from "lodash";
import {
  selectFetchingChat,
  selectFetchingMarketplace
} from "../../../reselects/fetchingSelector";
import { useSelector } from "react-redux";
import { selectMarketplaceDetail } from "../../../reselects/marketplaceSelector";
import { useHistory, useLocation, useParams } from "react-router";
import { GetMarketplaceDetailCallback as getMarketplaceDetailCallback } from "../../../callbacks/marketplaceCallback";
import {
  formatCurrency,
  listImageURL,
  nameCar,
  textEmpty,
  validateIsBorderBottom
} from "../../../utils/common";
import { Content } from "./MarketplaceDetail.styles";
import Icon from "@ant-design/icons";
import { CartSvg, LocationSvg } from "../../../assets/images/blimobil";
import useData from "../hoooks/useData";
import RouteName from "../../../routeName";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import storage from "../../../utils/localStorage";
import DetailChats from "../../../components/ChatCustom/DetailChats";

export default function MarketplaceDetailPage() {
  const location = useLocation();
  const { supplierCode, car } = location.state;
  const { id } = useParams();
  const history = useHistory();
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false
  });

  // callback
  const getMarkertplaceDetail = getMarketplaceDetailCallback();
  const createChat = createChatCallback();

  // select
  const isFetchingChat = useSelector(selectFetchingChat());
  const isFetching = useSelector(selectFetchingMarketplace());
  // const marketplaceDetail = useSelector(selectMarketplaceDetail());
  const marketplaceDetail = car;

  const [
    dataDetailMarketplace,
    dataFeaturesConvenience,
    dataFeaturesCabin,
    dataFeaturesSafety,
    dataFeaturesLighting
  ] = useData(marketplaceDetail);

  // useEffect(() => {
  //   if (id) {
  //     getMarkertplaceDetail && getMarkertplaceDetail(id);
  //   }
  // }, [id]);

  const onHandleNavigationBooking = () =>
    history.push(`${RouteName.marketplace.booking}/${id}`, {
      car: marketplaceDetail
    });

  const onCreateChat = () => {
    createChat &&
      createChat(
        {
          carCode: id
        },
        (result) => {
          setChatParams({
            itemChat: {
              code: result._id,
              car: marketplaceDetail
            },
            visible: true
          });
        },
        CHAT_TYPE_CREATE.CAR,
        TYPE_CHAT_DEALER.SUPPLIER.key
      );
  };

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  return (
    <div>
      <PageHeaderCustom
        type={TYPE_PAGE.DETAIL}
        title={marketplaceDetail.vin}
        subTitle={nameCar(marketplaceDetail)}
        loading={isFetching}
        extra={
          <div style={{ height: 52, marginRight: 24 }}>
            <Space size={24} style={{ height: "100%" }}>
              {isFetchingChat ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                <MessageOutlined
                  onClick={onCreateChat}
                  style={{ color: "white" }}
                />
              )}
              {isFetching ? (
                <Skeleton.Button active={true}></Skeleton.Button>
              ) : (
                <Space>
                  <Badge
                    color={
                      UIColor.status[
                        camelCase(CAR_STATUS_VALUE[marketplaceDetail.status])
                      ]
                    }
                  />
                  <TextStatus style={{ color: "white" }}>
                    {CAR_STATUS_VALUE[marketplaceDetail.status]}
                  </TextStatus>
                </Space>
              )}
            </Space>
          </div>
        }
      />
      <Content>
        <Row gutter={[24, 24]}>
          <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
            <Col xs={24} xl={16}>
              <CarouselCustom
                isBorder={true}
                listFile={listImageURL(marketplaceDetail.photos)}
              />
            </Col>
            <Col xl={8} xs={24}>
              <div style={{ padding: 4 }}>
                <Space direction="vertical">
                  <IText fSize={14} color={UIColor.gray._8}>
                    VIN: {`${marketplaceDetail.vin}`}
                  </IText>
                  <ITitle fSize={24}>{nameCar(marketplaceDetail)}</ITitle>
                  <LineCar />
                  <ITitle fSize={16}>
                    Automatic, 2.5 Liter 4-Cylinder 203HP
                  </ITitle>
                  <Space>
                    <IText fSize={14}>
                      Store{" "}
                      <span style={{ fontWeight: 600 }} color="#666666">
                        MAXINDO
                      </span>
                    </IText>
                    <Box>
                      <Icon component={LocationSvg} />
                      <IText fSize={14} color="#666666">
                        {car.location}
                      </IText>
                    </Box>
                  </Space>
                  <Space>
                    <ITitle fSize={16} color={UIColor.orange._3}>
                      IDR
                    </ITitle>
                    <ITitle fSize={24} color={UIColor.orange._3}>
                      {formatCurrency(marketplaceDetail.sellingPrice)}
                    </ITitle>
                  </Space>
                </Space>
              </div>
              <Row gutter={[12, 12]}>
                <Col span={11}>
                  <ButtonCustom
                    rounded={4}
                    icon={
                      <Icon component={CartSvg} style={{ marginRight: 12 }} />
                    }
                    onClick={onHandleNavigationBooking}
                    style={{ marginTop: 40 }}
                    bgColor={UIColor.orange._5}
                  >
                    MAKE ORDER
                  </ButtonCustom>
                </Col>
                <Col span={13}>
                  <ButtonCustom
                    rounded={4}
                    bgColor={UIColor.primary}
                    icon={<MessageOutlined style={{ color: "white" }} />}
                    onClick={onCreateChat}
                    style={{ marginTop: 40 }}
                  >
                    CHAT WITH SUPPLIER
                  </ButtonCustom>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={16}>
              <ITitle fSize={24}>Car Details</ITitle>
              <ListCustom
                grid={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 2,
                  xl: 2
                }}
                dataSource={dataDetailMarketplace}
                bordered={true}
                style={{ margin: "12px" }}
                renderItem={(item, index) => (
                  <List.Item
                    style={{
                      height: "100%",
                      padding: "8px 12px",
                      borderBottom: validateIsBorderBottom(
                        dataDetailMarketplace.length,
                        index
                      )
                        ? "1px solid #d9d9d9"
                        : "unset",
                      borderRight:
                        index % 2 === 0 ? "1px solid #d9d9d9" : "unset"
                    }}
                  >
                    <Box justify="space-between" items="center">
                      <IText color="black">{item.label}</IText>
                      <IText color="black" strong fSize={14}>
                        {textEmpty(item.value)}
                      </IText>
                    </Box>
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={24} xl={16}>
              <ITitle fSize={24}>Features</ITitle>
              <div style={{ padding: 12, width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }} size={24}>
                  <div>
                    <ITitle color={UIColor.gray._5}>Convenience</ITitle>
                    <Divider style={{ marginBottom: 6, marginTop: 12 }} />
                    <ListCustom
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2
                      }}
                      dataSource={dataFeaturesConvenience}
                      renderItem={(item, index) => (
                        <List.Item
                          style={{
                            height: "100%",
                            padding: "8px 12px"
                          }}
                        >
                          <Box justify="flex-start" items="center">
                            <Image
                              src={item.icon}
                              width={30}
                              height={30}
                              preview={false}
                            />
                            <IText color={UIColor.gray._2} fSize={13}>
                              {textEmpty(item.name)}
                            </IText>
                          </Box>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div>
                    <ITitle color={UIColor.gray._5}>Cabin</ITitle>
                    <Divider style={{ marginBottom: 6, marginTop: 12 }} />
                    <ListCustom
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2
                      }}
                      dataSource={dataFeaturesCabin}
                      renderItem={(item, index) => (
                        <List.Item
                          style={{
                            height: "100%",
                            padding: "8px 12px"
                          }}
                        >
                          <Box justify="flex-start" items="center">
                            <Image
                              src={item.icon}
                              width={30}
                              height={30}
                              preview={false}
                            />
                            <IText color={UIColor.gray._2} fSize={13}>
                              {textEmpty(item.name)}
                            </IText>
                          </Box>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div>
                    <ITitle color={UIColor.gray._5}>Safety</ITitle>
                    <Divider style={{ marginBottom: 6, marginTop: 12 }} />
                    <ListCustom
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2
                      }}
                      dataSource={dataFeaturesSafety}
                      renderItem={(item, index) => (
                        <List.Item
                          style={{
                            height: "100%",
                            padding: "8px 12px"
                          }}
                        >
                          <Box justify="flex-start" items="center">
                            <Image
                              src={item.icon}
                              width={30}
                              height={30}
                              preview={false}
                            />
                            <IText color={UIColor.gray._2} fSize={13}>
                              {textEmpty(item.name)}
                            </IText>
                          </Box>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div>
                    <ITitle color={UIColor.gray._5}>Lighting</ITitle>
                    <Divider style={{ marginBottom: 6, marginTop: 12 }} />
                    <ListCustom
                      grid={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2
                      }}
                      dataSource={dataFeaturesLighting}
                      renderItem={(item, index) => (
                        <List.Item
                          style={{
                            height: "100%",
                            padding: "8px 12px"
                          }}
                        >
                          <Box justify="flex-start" items="center">
                            <Image
                              src={item.icon}
                              width={30}
                              height={30}
                              preview={false}
                            />
                            <IText color={UIColor.gray._2} fSize={13}>
                              {textEmpty(item.name)}
                            </IText>
                          </Box>
                        </List.Item>
                      )}
                    />
                  </div>
                </Space>
              </div>
            </Col>
          </Skeleton>
        </Row>
      </Content>
      <DetailChats
        itemChat={chatParams.itemChat}
        onClose={onClose}
        visible={chatParams.visible}
      />
    </div>
  );
}
