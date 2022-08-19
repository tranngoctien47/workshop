import { Avatar, Badge, Dropdown, Space, Tag, Typography } from "antd";
import { startCase } from "lodash";
import React, { useEffect, useState } from "react";
import { ButtonCustom, IText, ITextBlack } from "../../../components";
import TableRoot from "../../../components/TableCustom";
import { data } from "./data";
import {
  MenuCustom,
  MenuItemCustom,
  DividerCustom
} from "../../../components/DropdownCustom/DropdownCustom";
import UIColor from "../../../colors";
import { BoxEllipsis } from "../../Inventory/InventoryList/InventoryList.style";
import {
  CaretDownOutlined,
  EllipsisOutlined,
  MessageOutlined
} from "@ant-design/icons";
import RouteName from "../../../routeName";
import { useHistory } from "react-router";
import { selectFetchingOrder } from "../../../reselects/fetchingSelector";
import { useSelector } from "react-redux";
import {
  selectOrderList,
  selectOrderParams
} from "../../../reselects/orderSelector";
import {
  GetOrderListCallback as getOrderListCallback,
  UpdateOrderStatusAdminCallback as updateOrderStatusAdminCallback
} from "../../../callbacks/orderCallback";
import {
  formatCurrency,
  parseDateColumnTable,
  textEmpty
} from "../../../utils/common";
import { ItemFilter } from "../../../components/TableCustom/TableRoot.style";
import {
  CHAT_TYPE_CREATE,
  STATUS_ORDER_BUYER,
  STATUS_ORDER_DEALER,
  TYPE_CHAT_ADMIN,
  TYPE_CHAT_DEALER,
  TYPE_CHAT_SUPPLIER,
  TYPE_ORDER,
  TYPE_USER
} from "../../../consts/Enum";
import storage from "../../../utils/localStorage";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import DetailChats from "../../../components/ChatCustom/DetailChats";
import styled from "styled-components";

function colorStatus(status) {
  switch (status) {
    case "new":
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "new"
      };
    case "pendingPayment":
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "pendingPayment"
      };
    case "verifyingPayment":
      return {
        bgColor: "#FFE2CC",
        color: "#FF9A4D",
        value: "verifyingPayment"
      };
    case "paid":
      return {
        bgColor: "#A5F6E2",
        color: "#1BD2A4",
        value: "paid"
      };
    case "payment":
      return {
        bgColor: "#A5F6E2",
        color: "#1BD2A4",
        value: "Payment"
      };
    case "delivered":
      return {
        color: "#666666",
        bgColor: "#D2D1D4",
        value: "delivered"
      };
    case "completed":
      return {
        color: "#376ED7",
        bgColor: "#C1D5FB",
        value: "completed"
      };
    case "cancelLed":
      return {
        color: "#F76969",
        bgColor: "#FCBFBF",
        value: "cancelLed"
      };
    default:
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "new"
      };
  }
}

const BoxLoan = styled.span`
  font-size: 11px;
  color: white;
  padding: 1px 6px;
  font-weight: 600;
  background: #18ba92;
  border-radius: 2px;
`;

export default function OrderListPage() {
  const navigate = useHistory();
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false
  });

  const dataColumnsBuyerOrderAdmin = [
    "order",
    "status",
    "product",
    "dealerName",
    "buyer",
    "date",
    "totalAmount",
    "totalFee",
    "action"
  ];

  const dataColumnsBuyerOrder = [
    "order",
    "status",
    "product",
    "buyer",
    "date",
    "totalAmount",
    "totalFee",
    "action"
  ];

  const dataColumnsDealerOrderAdmin = [
    "order",
    "status",
    "product",
    "company",
    "dealer",
    "date",
    "totalAmount",
    "totalFee",
    "action"
  ];

  const columnsTable = () => {
    if (storage.getIdToken() === TYPE_USER.ADMIN) {
      if (orderParams.type === TYPE_ORDER.BUYER_DEALER) {
        return dataColumnsBuyerOrderAdmin;
      }
      return dataColumnsDealerOrderAdmin;
    }
    return dataColumnsBuyerOrder;
  };

  //selector
  const isFetching = useSelector(selectFetchingOrder());
  const orderParams = useSelector(selectOrderParams());
  const orderData = useSelector(selectOrderList());
  const isRule = useSelector((state) => state.Auth.idToken);

  //callback
  const getOrder = getOrderListCallback();
  const updateStatusOrder = updateOrderStatusAdminCallback();
  const createChat = createChatCallback();

  const onCreateChat = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    createChat &&
      createChat(
        {
          orderCode: record.order
        },
        (result) => {
          setChatParams({
            itemChat: {
              code: result._id,
              car: record.car
            },
            visible: true
          });
        },
        CHAT_TYPE_CREATE.ORDER,
        key
      );
  };

  const contentChatSupplier = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom key={TYPE_CHAT_ADMIN.DEALER}>
        Chat with Dealer
      </MenuItemCustom>
      <MenuItemCustom key={TYPE_CHAT_SUPPLIER.ADMIN.key}>
        Chat with Admin
      </MenuItemCustom>
      {record.financeCode && (
        <MenuItemCustom key={TYPE_CHAT_ADMIN.FINACE}>
          Chat with Finance
        </MenuItemCustom>
      )}
    </MenuCustom>
  );

  const contentChat = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom key={TYPE_CHAT_ADMIN.DEALER}>
        Chat with Dealer
      </MenuItemCustom>
      {orderParams.type !== TYPE_ORDER.BUYER_DEALER && (
        <MenuItemCustom key={TYPE_CHAT_ADMIN.SUPPLIER}>
          Chat with Supplier
        </MenuItemCustom>
      )}
      {record.financeCode && (
        <MenuItemCustom key={TYPE_CHAT_ADMIN.FINACE}>
          Chat with Finance
        </MenuItemCustom>
      )}
    </MenuCustom>
  );

  const onClickMenuDropdown = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    updateStatusOrder(
      record.code,
      orderParams.type,
      { status: "paid" },
      orderParams
    );
  };

  const content = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onClickMenuDropdown({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom>
        <MenuItemCustom>Paid</MenuItemCustom>
      </MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom>Edit</MenuItemCustom>
      <MenuItemCustom color="red">Delete</MenuItemCustom>
    </MenuCustom>
  );

  const columnConfig = {
    order: {
      dataIndex: "order",
      title: "Order #"
    },
    status: {
      dataIndex: "status",
      render: (value) =>
        !value ? (
          "-"
        ) : (
          <Tag
            color={colorStatus(value).bgColor}
            style={{
              color: colorStatus(value).color,
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: 10,
              border: `0.5px solid ${colorStatus(value).color}`
            }}
          >
            {startCase(colorStatus(value).value)}
          </Tag>
        )
    },
    product: {
      dataIndex: "product"
    },
    company: {
      dataIndex: "company"
    },
    dealer: {
      dataIndex: "dealer"
    },
    buyer: {
      dataIndex: "buyer"
    },
    date: {
      title: "Date",
      dataIndex: "date",
      render: (value) => parseDateColumnTable(value)
    },
    totalAmount: {
      dataIndex: "totalAmount",
      render: (value, record) => {
        return record.financeCode ? (
          <Space size={4} direction="vertical">
            <Space align="baseline" size={4}>
              <ITextBlack>{`IDR ${formatCurrency(value)}`}</ITextBlack>
              <BoxLoan>L</BoxLoan>
            </Space>
            <IText fSize={11} color={UIColor.gray._8}>
              {textEmpty(record?.finance)}
            </IText>
          </Space>
        ) : (
          `IDR ${formatCurrency(value)}`
        );
      }
    },
    totalFee: {
      dataIndex: "totalFee",
      render: (value) => (!value ? `-` : `IDR ${formatCurrency(value)}`),
      align: "right"
    },
    action: {
      dataIndex: "action",
      render: (value, record) => (
        <Space size={16}>
          <Dropdown
            trigger={["click"]}
            overlay={
              isRule === TYPE_USER.SUPPLIER
                ? contentChatSupplier(record)
                : contentChat(record)
            }
            placement="bottomLeft"
          >
            <Badge
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              dot
            >
              <MessageOutlined style={{ fontSize: 16 }} />
            </Badge>
          </Dropdown>
          <Dropdown
            trigger={["click"]}
            overlay={content(record)}
            placement="bottomLeft"
          >
            <BoxEllipsis
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <EllipsisOutlined />
            </BoxEllipsis>
          </Dropdown>
        </Space>
      )
    }
  };

  const onClickRow = (id) =>
    navigate.push(`${RouteName.order.detail}/${id}`, {
      type: orderParams.type
    });

  useEffect(() => {
    getOrder && getOrder(Object.assign(orderParams, { page: 1 }));
  }, []);

  const onChangeTable = (params) => {
    getOrder(Object.assign(orderParams, params));
  };

  const onChangeStatusOrder = ({ key }, type) => {
    getOrder(Object.assign(orderParams, { page: 1, type }));
  };

  const contentListBuyerStatus = () => (
    <MenuCustom
      onClick={({ key }) =>
        onChangeStatusOrder({ key }, TYPE_ORDER.BUYER_DEALER)
      }
    >
      <MenuItemCustom key="all">All Order (141)</MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom key={STATUS_ORDER_BUYER.PENDING_PAYMENT}>
        Pending Payment (3)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.VERIFYING_PAYMENT}>
        Verifying Payment (2)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.PAID}>Paid (6)</MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.DELIVERED}>
        Delivered (19)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.RELEASED_PAYMENT}>
        Released Payment (5)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.COMPLETED}>
        Completed (62)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_BUYER.CANCELLED} color="red">
        Cancelled (44)
      </MenuItemCustom>
    </MenuCustom>
  );

  const contentListDealerStatus = () => (
    <MenuCustom
      onClick={({ key }) =>
        onChangeStatusOrder({ key }, TYPE_ORDER.DEALER_SUPPLIER)
      }
    >
      <MenuItemCustom key="all">All Order (141)</MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom key={STATUS_ORDER_DEALER.PENDING_PAYMENT}>
        Pending Payment (3)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.VERIFYING_PAYMENT}>
        Verifying Payment (2)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.PAID_PARTIALLY_PAID}>
        Paid/Partially Paid (6)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.DELIVERED}>
        Delivered (19)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.RELEASED_PAYMENT}>
        Released Payment (5)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.COMPLETED}>
        Completed (62)
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_ORDER_DEALER.CANCELLED} color="red">
        Cancelled (44)
      </MenuItemCustom>
    </MenuCustom>
  );

  const componentFilter = () => (
    <Space size={0}>
      <Dropdown
        trigger={["click"]}
        overlay={contentListBuyerStatus}
        placement="bottomLeft"
      >
        <ItemFilter active={orderParams.type === TYPE_ORDER.BUYER_DEALER}>
          <Space size={6} align="center">
            <Typography.Text>Buyer Orders:</Typography.Text>
            <Typography.Text>{startCase(orderParams.status)}</Typography.Text>
            <CaretDownOutlined
              style={{
                color:
                  orderParams.type === TYPE_ORDER.BUYER_DEALER
                    ? "white"
                    : UIColor.gray._5
              }}
            />
          </Space>
        </ItemFilter>
      </Dropdown>
      {storage.getIdToken() === TYPE_USER.ADMIN && (
        <Dropdown
          trigger={["click"]}
          overlay={contentListDealerStatus}
          placement="bottomLeft"
        >
          <ItemFilter active={orderParams.type === TYPE_ORDER.DEALER_SUPPLIER}>
            <Space size={6} align="center">
              <Typography.Text>Dealer Orders:</Typography.Text>
              <Typography.Text>{startCase(orderParams.status)}</Typography.Text>
              <CaretDownOutlined
                style={{
                  color:
                    orderParams.type === TYPE_ORDER.DEALER_SUPPLIER
                      ? "white"
                      : UIColor.gray._5
                }}
              />
            </Space>
          </ItemFilter>
        </Dropdown>
      )}
    </Space>
  );

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  return (
    <div>
      <TableRoot
        gridColumns="2fr 1fr"
        onClickRow={onClickRow}
        dataColumns={columnsTable()}
        columnConfig={columnConfig}
        dataSource={orderData}
        loading={isFetching}
        listStatus={[]}
        pagination={orderParams}
        componentFilter={componentFilter}
        onChange={onChangeTable}
        isComponentFilter={true}
        isFilter={false}
      />
      <DetailChats
        itemChat={chatParams.itemChat}
        onClose={onClose}
        visible={chatParams.visible}
      />
    </div>
  );
}
