import Icon, {
  CaretDownOutlined,
  MessageOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Badge,
  Col,
  Dropdown,
  Row,
  Space,
  Image,
  Divider,
  Tag,
  Checkbox,
  Skeleton
} from "antd";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import UIColor from "../../../colors";
import {
  ButtonCustom,
  ImageCustom,
  IText,
  ITitle,
  PageHeaderCustom
} from "../../../components";
import {
  DividerCustom,
  MenuCustom,
  MenuItemCustom
} from "../../../components/DropdownCustom/DropdownCustom";
import * as C from "../../../consts/Enum";
import { Content, DetailContent, MenuContent } from "./OrderDetail.style";
import {
  CarSvg,
  HistorySvg,
  ImageCarousel
} from "../../../assets/images/blimobil";
import { startCase, upperCase } from "lodash";
import StepHistoryOrder from "./component/StepHistoryOrder";
import {
  GetOrderDetailAdminCallback as getOrderDetailAdminCallback,
  GetOrderDetailCallback as getOrderDetailCallback
} from "../../../callbacks/orderCallback";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOrderDetail } from "../../../reselects/orderSelector";
import { selectFetchingOrder } from "../../../reselects/fetchingSelector";
import { formatCurrency, nameCar, textEmpty } from "../../../utils/common";
import storage from "../../../utils/localStorage";
import Urls from "../../../consts/Urls";
import DetailChats from "../../../components/ChatCustom/DetailChats";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";

export default function OrdersDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false
  });
  // select
  const orderDetail = useSelector(selectOrderDetail());
  const isFetching = useSelector(selectFetchingOrder());

  // callback
  const getOrderDetail = getOrderDetailCallback();
  const getOrderDetailAdmin = getOrderDetailAdminCallback();
  const createChat = createChatCallback();

  const configColumn = useMemo(() => {
    return orderDetail.paymentOption === "2" ? 6 : 8;
  }, [orderDetail]);

  useEffect(() => {
    if (id) {
      if (storage.getIdToken() === C.TYPE_USER.ADMIN) {
        getOrderDetailAdmin &&
          getOrderDetailAdmin(id, location?.state?.type || "");
      } else {
        getOrderDetail && getOrderDetail(id);
      }
    }
  }, [id]);

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  const content = (
    <MenuCustom>
      <MenuItemCustom>Delivered Order</MenuItemCustom>
      <MenuItemCustom>Received Payment</MenuItemCustom>
      {/* <DividerCustom />
      <MenuItemCustom>Chat with Blimobil</MenuItemCustom> */}
    </MenuCustom>
  );

  const itemDescriptions = (label, value) => (
    <Fragment>
      <IText>{label}</IText>
      <br />
      <ITitle>{value}</ITitle>
    </Fragment>
  );

  const onCreateChat = ({ item, key, keyPath, domEvent }) => {
    domEvent.stopPropagation();
    createChat &&
      createChat(
        {
          orderCode: id
        },
        (result) => {
          setChatParams({
            itemChat: {
              code: result._id,
              car: orderDetail?.car
            },
            visible: true
          });
        },
        C.CHAT_TYPE_CREATE.ORDER,
        key
      );
  };
  const contentChat = () => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent })
      }
    >
      <MenuItemCustom key={C.TYPE_CHAT_ADMIN.DEALER}>
        Chat with Dealer
      </MenuItemCustom>
      {location?.state?.type !== C.TYPE_ORDER.BUYER_DEALER && (
        <MenuItemCustom key={C.TYPE_CHAT_ADMIN.SUPPLIER}>
          Chat with Supplier
        </MenuItemCustom>
      )}
      {orderDetail.financeCode && (
        <MenuItemCustom key={C.TYPE_CHAT_ADMIN.FINACE}>
          Chat with Finance
        </MenuItemCustom>
      )}
    </MenuCustom>
  );

  return (
    <div>
      <PageHeaderCustom
        type={C.TYPE_PAGE.DETAIL}
        title={`#${upperCase(id)}`}
        // subTitle="This order is cancelled"
        extra={
          <Space size={32}>
            <Space>
              <Dropdown
                trigger={["click"]}
                overlay={contentChat}
                placement="bottomLeft"
              >
                <Badge size="small" dot>
                  <MessageOutlined style={{ fontSize: 16, color: "white" }} />
                </Badge>
              </Dropdown>
            </Space>
            <Dropdown overlay={content} placement="bottomLeft">
              <ButtonCustom
                type="text"
                height={52}
                rounded={0}
                bgColor={UIColor.orange._5}
                //   onClick={onNavigate}
                //   icon={<Icon component={EditSvg} width={32} height={32} />}
              >
                ACTION
                <CaretDownOutlined />
              </ButtonCustom>
            </Dropdown>
          </Space>
        }
      />
      <Content>
        <DetailContent>
          <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
            <div id="car-information">
              <Space size={12} align="center">
                <Icon component={CarSvg} />
                <ITitle fSize={24}>Car Information</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[32, 16]}>
                  <Col span={6}>
                    <ImageCustom
                      height={156}
                      src={
                        orderDetail?.car?.photos?.length
                          ? Urls.URL_FILE +
                            orderDetail?.car?.photos[0]?.path?.origin
                          : ""
                      }
                    />
                  </Col>
                  <Col span={18}>
                    <ITitle style={{ letterSpacing: "0.15em" }}>
                      {nameCar(orderDetail?.car)}
                    </ITitle>
                    <Divider dashed />
                    <Row gutter={[12, 12]}>
                      <Col span={configColumn}>
                        <IText>Status</IText>
                        <br />
                        <ITitle>
                          <Tag
                            color="#FFE2CC"
                            style={{
                              color: "#FF9A4D",
                              textTransform: "uppercase",
                              fontWeight: 600,
                              fontSize: 10,
                              border: `0.5px solid #FF9A4D`
                            }}
                          >
                            {startCase(orderDetail.status)}
                          </Tag>
                        </ITitle>
                      </Col>
                      <Col span={configColumn}>
                        <IText>Booking ID</IText>
                        <br />
                        <ITitle>
                          {upperCase(textEmpty(orderDetail?.code))}
                        </ITitle>
                      </Col>
                      <Col span={configColumn}>
                        <IText>Total Amount</IText>
                        <br />
                        <ITitle>
                          IDR {formatCurrency(orderDetail?.car?.sellingPrice)}
                        </ITitle>
                      </Col>
                      {orderDetail.paymentOption === "2" && (
                        <Col span={6}>
                          <IText>Loan Amount (70%)</IText>
                          <br />
                          <ITitle>
                            IDR{" "}
                            {formatCurrency(
                              (orderDetail?.car?.sellingPrice * 0.7).toFixed(0)
                            )}
                          </ITitle>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Divider />
                </Row>
              </div>
            </div>
            <div id="car-information">
              <Space size={12} align="center">
                <UserOutlined
                  style={{
                    fontSize: 16,
                    border: "1px solid #666666",
                    borderRadius: 2
                  }}
                />
                <ITitle fSize={24}>Customer Information</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    {itemDescriptions(
                      "Your Name",
                      textEmpty(orderDetail?.personalInfo?.name)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "Phone Number",
                      textEmpty(orderDetail?.personalInfo?.phone)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "Email",
                      textEmpty(orderDetail?.buyer?.email)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "City",
                      textEmpty(orderDetail?.personalInfo?.city)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "ZIP Code",
                      textEmpty(orderDetail?.personalInfo?.zip_code)
                    )}
                  </Col>
                  <Col span={24}>
                    {itemDescriptions(
                      "Address",
                      textEmpty(orderDetail?.personalInfo?.address)
                    )}
                  </Col>
                </Row>
              </div>
            </div>
            <Divider />
            <Checkbox>Billing Address is the same delivery address</Checkbox>
          </Skeleton>
        </DetailContent>
        <MenuContent>
          <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
            <Space size={12} align="center">
              <Icon component={HistorySvg} />
              <ITitle fSize={24}>Order History</ITitle>
            </Space>
            <div style={{ marginTop: 24, padding: "0px 24px" }}>
              <StepHistoryOrder />
            </div>
          </Skeleton>
        </MenuContent>
        <DetailChats
          itemChat={chatParams.itemChat}
          onClose={onClose}
          visible={chatParams.visible}
        />
      </Content>
    </div>
  );
}
