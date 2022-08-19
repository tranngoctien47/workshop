import { Avatar, Badge, Dropdown, message, Space, Tag, Typography } from "antd";
import { startCase, random } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { ButtonCustom, IText } from "../../../../components";
import TableRoot from "../../../../components/TableCustom";
import {
  MenuCustom,
  MenuItemCustom,
  DividerCustom,
} from "../../../../components/DropdownCustom/DropdownCustom";
import UIColor from "../../../../colors";
import { BoxEllipsis } from "../../../Inventory/InventoryList/InventoryList.style";
import {
  CaretDownOutlined,
  EllipsisOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RouteName from "../../../../routeName";
import { useHistory } from "react-router";
import { GetUserListCallback as getUserListCallback } from "../../../../callbacks/userCallback";
import { useSelector } from "react-redux";
import {
  selectFetchingMerchant,
  selectFetchingUser,
} from "../../../../reselects/fetchingSelector";
import {
  selectUserList,
  selectUserParams,
} from "../../../../reselects/userSelector";
import { ItemFilter } from "./UserList.style";
import {
  STATUS_DEALER,
  STATUS_SUPPLIER,
  TYPE_USER,
} from "../../../../consts/Enum";
import {
  GetMerchantListCallback as getMerchantListCallback,
  UpdateStatusMerchantCallback as updateStatusMerchantCallback,
} from "../../../../callbacks/merchantCallback";
import { selectMerchantList } from "../../../../reselects/merchantSelector";

const colorStatus = {
  new: {
    bgColor: "#CAEBF9",
    color: "#50BDEA",
    value: "new",
  },
  available: {
    bgColor: "#A5F6E2",
    color: "#1BD2A4",
    value: "available",
  },
  requestingStore: {
    bgColor: "#FFE2CC",
    color: "#FF9A4D",
    value: "requestingStore",
  },
  storeRejected: {
    color: "#666666",
    bgColor: "#D2D1D4",
    value: "storeRejected",
  },
  deleted: {
    color: "#F76969",
    bgColor: "#FCBFBF",
    value: "deleted",
  },
};

export default function UserListPage() {
  const [filter, setFilter] = useState({
    type: TYPE_USER.BUYER,
    label: "all",
  });
  const navigate = useHistory();

  // select
  const isFetching = useSelector(selectFetchingUser());
  const isFetchingMerchant = useSelector(selectFetchingMerchant());
  const userParams = useSelector(selectUserParams());
  const userData = useSelector(selectUserList());
  const listMerchant = useSelector(selectMerchantList());

  // callback
  const getUser = getUserListCallback();
  const getMerchant = getMerchantListCallback();
  const updateStatusMerchant = updateStatusMerchantCallback();

  const dataColumnsBuyer = [
    "buyers",
    "dateRegistered",
    "lastVisited",
    "status",
    "totalCharged",
  ];
  const dataColumnsDealers = [
    "dealerName",
    "companyName",
    "dateRegistered",
    "lastVisited",
    "status",
    "inventory",
    "action",
  ];

  const onClickMenuDropdown = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();
    if (!record.merchantCode) {
      return message.error("Store not created yet");
    }
    updateStatusMerchant({ action: key }, record.merchantCode, () => {
      if (
        filter.label === STATUS_DEALER.RESQUESTING_STORE &&
        filter.type === TYPE_USER.DEALER
      ) {
        getMerchant({ status: STATUS_DEALER.RESQUESTING_STORE });
      } else {
        getUser(Object.assign(userParams));
      }
    });
  };

  const content = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onClickMenuDropdown({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom key="approve">
        <ButtonCustom
          width={172}
          height={34}
          bgColor={UIColor.primaryBtnSuccess}
        >
          Approve
        </ButtonCustom>
      </MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom key="reject">Reject</MenuItemCustom>
    </MenuCustom>
  );

  const onChangeStatusUser = (key) => {
    getUser && getUser(Object.assign(userParams, { page: 1, userRole: key }));
    setFilter({
      type: key,
      label: "All",
    });
  };

  const contentBuyer = () => (
    <MenuCustom onClick={() => onChangeStatusUser(TYPE_USER.BUYER)}>
      <MenuItemCustom>All Buyer (890)</MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom>New (30)</MenuItemCustom>
      <MenuItemCustom>Available(764)</MenuItemCustom>
      <MenuItemCustom>Deleted(15)</MenuItemCustom>
    </MenuCustom>
  );

  const onChangeStatusDealer = ({ key }) => {
    if (key !== STATUS_DEALER.ALL_DEALERS && key !== STATUS_DEALER.NEW) {
      setFilter({
        type: TYPE_USER.DEALER,
        label: key,
      });
      getMerchant && getMerchant({ status: key, type: TYPE_USER.DEALER });
    } else {
      setFilter({
        type: TYPE_USER.DEALER,
        label: key,
      });
      getUser &&
        getUser(
          Object.assign(userParams, { page: 1, userRole: TYPE_USER.DEALER })
        );
    }
  };

  const contentDealer = () => (
    <MenuCustom onClick={onChangeStatusDealer}>
      <MenuItemCustom key={STATUS_DEALER.ALL_DEALERS}>
        All Dealers
      </MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom key={STATUS_DEALER.NEW}>New</MenuItemCustom>
      <MenuItemCustom key={STATUS_DEALER.RESQUESTING_STORE}>
        Resquesting Store
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_DEALER.AVAILABLE}>Available</MenuItemCustom>
      <MenuItemCustom key={STATUS_DEALER.STORE_REJECTED}>
        Store Rejected
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_DEALER.DELETED}>Deleted</MenuItemCustom>
    </MenuCustom>
  );

  const onChangeStatusSupplier = ({ key }) => {
    if (key !== STATUS_SUPPLIER.ALL_SUPPLIER && key !== STATUS_SUPPLIER.NEW) {
      setFilter({
        type: TYPE_USER.SUPPLIER,
        label: key,
      });
      getMerchant && getMerchant({ status: key, type: TYPE_USER.SUPPLIER });
    } else {
      setFilter({
        type: TYPE_USER.SUPPLIER,
        label: key,
      });
      getUser &&
        getUser(
          Object.assign(userParams, { page: 1, userRole: TYPE_USER.SUPPLIER })
        );
    }
  };

  const contentSupplier = () => (
    <MenuCustom onClick={onChangeStatusSupplier}>
      <MenuItemCustom key={STATUS_SUPPLIER.ALL_SUPPLIER}>
        All Supplier
      </MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom key={STATUS_SUPPLIER.NEW}>New</MenuItemCustom>
      <MenuItemCustom key={STATUS_SUPPLIER.RESQUESTING_STORE}>
        Resquesting Store
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_SUPPLIER.AVAILABLE}>Available</MenuItemCustom>
      <MenuItemCustom key={STATUS_SUPPLIER.STORE_REJECTED}>
        Store Rejected
      </MenuItemCustom>
      <MenuItemCustom key={STATUS_SUPPLIER.DELETED}>Deleted</MenuItemCustom>
    </MenuCustom>
  );

  const columnConfig = {
    buyers: {
      dataIndex: "buyers",
      render: (value) => (
        <Space direction="horizontal" align="center">
          <Avatar src={value.avatar} icon={<UserOutlined />} size={32} />
          <Space direction="vertical" size={0}>
            <IText strong>{value.name || "-"}</IText>
            <IText color={UIColor.gray._5} fSize={11}>
              {value.email}
            </IText>
          </Space>
        </Space>
      ),
    },
    dealerName: {
      dataIndex: "dealerName",
      render: (value) => (
        <Space direction="horizontal" align="center">
          <Avatar src={value.avatar} icon={<UserOutlined />} size={32} />
          <Space direction="vertical" size={0}>
            <IText strong>{value.name || "-"}</IText>
            <IText color={UIColor.gray._5} fSize={11}>
              {value.email}
            </IText>
          </Space>
        </Space>
      ),
    },
    status: {
      dataIndex: "status",
      render: (value) =>
        !value ? (
          "-"
        ) : (
          <Tag
            color={colorStatus[value].bgColor}
            style={{
              color: colorStatus[value].color,
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: 10,
              border: `0.5px solid ${colorStatus[value].color}`,
            }}
          >
            {startCase(colorStatus[value].value)}
          </Tag>
        ),
    },
    inventory: {
      dataIndex: "inventory",
      render: (value) => (
        <IText strong fSize={13} color="#295EC2">
          {value || 0}
        </IText>
      ),
      align: "center",
    },
    action: {
      dataIndex: "action",
      render: (value, record) => (
        <Space size={16}>
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
      ),
    },
  };

  const onClickRow = (id, record) => {
    (filter.type === TYPE_USER.DEALER || filter.type === TYPE_USER.SUPPLIER) &&
      navigate.push(`${RouteName.user.detail}/${id}`, {
        merchantCode: record.merchantCode,
        type:
          filter.type === TYPE_USER.DEALER
            ? TYPE_USER.DEALER
            : TYPE_USER.SUPPLIER,
      });
  };

  const componentFilter = () => (
    <Space size={0}>
      <Dropdown
        trigger={["click"]}
        overlay={contentBuyer()}
        placement="bottomLeft"
      >
        <ItemFilter active={filter.type === TYPE_USER.BUYER}>
          <Space size={6} align="center">
            <Typography.Text>
              {filter.type === TYPE_USER.BUYER ? "Buyers:" : "Buyers"}
            </Typography.Text>
            {filter.type === TYPE_USER.BUYER && (
              <Typography.Text>{startCase(filter.label)}</Typography.Text>
            )}
            <CaretDownOutlined
              style={{
                color: filter.type === TYPE_USER.BUYER ? "white" : "#444444",
              }}
            />
          </Space>
        </ItemFilter>
      </Dropdown>
      <Dropdown
        trigger={["click"]}
        overlay={contentDealer()}
        placement="bottomLeft"
      >
        <ItemFilter active={filter.type === TYPE_USER.DEALER}>
          <Space size={6} align="center">
            <Typography.Text>
              {filter.type === TYPE_USER.DEALER ? "Dealers:" : "Dealers"}
            </Typography.Text>
            {filter.type === TYPE_USER.DEALER && (
              <Typography.Text>{startCase(filter.label)}</Typography.Text>
            )}
            <CaretDownOutlined
              style={{
                color: filter.type === TYPE_USER.DEALER ? "white" : "#444444",
              }}
            />
          </Space>
        </ItemFilter>
      </Dropdown>
      <Dropdown
        trigger={["click"]}
        overlay={contentSupplier()}
        placement="bottomLeft"
      >
        <ItemFilter
          // onClick={() => onChangeStatusUser(TYPE_USER.SUPPLIER)}
          active={filter.type === TYPE_USER.SUPPLIER}
        >
          <Space size={6} align="center">
            <Typography.Text>
              {filter.type === TYPE_USER.SUPPLIER ? "Supplier:" : "Supplier"}
            </Typography.Text>
            {filter.type === TYPE_USER.SUPPLIER && (
              <Typography.Text>{startCase(filter.label)}</Typography.Text>
            )}
            <CaretDownOutlined
              style={{
                color: filter.type === TYPE_USER.SUPPLIER ? "white" : "#444444",
              }}
            />
          </Space>
        </ItemFilter>
      </Dropdown>
    </Space>
  );

  useEffect(() => {
    getUser &&
      getUser(
        Object.assign(userParams, { page: 1, userRole: TYPE_USER.BUYER })
      );
  }, []);

  const onChangeTable = (params) => {
    getUser(Object.assign(userParams, params));
  };

  const dataSource = () => {
    if (
      (filter.type === TYPE_USER.DEALER &&
        filter.label !== STATUS_DEALER.ALL_DEALERS &&
        filter.label !== STATUS_DEALER.NEW) ||
      (filter.type === TYPE_USER.SUPPLIER &&
        filter.label !== STATUS_SUPPLIER.ALL_SUPPLIER &&
        filter.label !== STATUS_SUPPLIER.NEW)
    )
      return listMerchant;
    return userData;
  };

  return (
    <div>
      <TableRoot
        gridColumns="1fr"
        onClickRow={onClickRow}
        dataColumns={
          filter.type === TYPE_USER.DEALER || filter.type === TYPE_USER.SUPPLIER
            ? dataColumnsDealers
            : dataColumnsBuyer
        }
        columnConfig={columnConfig}
        dataSource={dataSource()}
        listStatus={[]}
        isComponentFilter={true}
        loading={isFetching || isFetchingMerchant}
        componentFilter={componentFilter}
        onChange={onChangeTable}
        pagination={userParams}
        isFilter={false}
        isSelectColumn={false}
        showPagination={
          !(
            filter.type === TYPE_USER.DEALER &&
            filter.label === STATUS_DEALER.RESQUESTING_STORE
          )
        }
      />
    </div>
  );
}
