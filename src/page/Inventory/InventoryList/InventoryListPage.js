import { Alert, Badge, Dropdown, Modal, Space, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import UIColor from "../../../colors";
import TableRoot from "../../../components/TableCustom";
import Icon, { EllipsisOutlined } from "@ant-design/icons";
import {
  EmptyInventorySvg,
  ImageSvg,
  InfoImage,
  Mp4Svg,
  PlusSvg,
} from "../../../assets/images/blimobil";
import {
  AlertStyled,
  BlockEmptyInventory,
  BoxEllipsis,
  RowStyled,
  BoxAlert
} from "./InventoryList.style";
import {
  DividerCustom,
  MenuCustom,
  MenuItemCustom,
} from "../../../components/DropdownCustom/DropdownCustom";
import { ButtonCustom, IText, ITitle } from "../../../components";
import { camelCase } from "lodash";
import { useHistory } from "react-router";
import RouteName from "../../../routeName";
import { useSelector } from "react-redux";
import {
  selectFetchingInventoryCountStatus,
  selectFetchingInventory,
} from "../../../reselects/fetchingSelector";
import {
  selectInventoryCountStatus,
  selectInventoryList,
  selectInventoryParams,
} from "../../../reselects/inventorySelector";
import {
  GetInventoryListCallback as getInventoryListCallback,
  GetInventoryCountStatusCallback as getInventoryCountStatusCallback,
  InventoryDeleteCallback as inventoryDeleteCallback,
  UpdateInventoryCallback as updateInventoryCallback,
} from "../../../callbacks/inventoryCallback";
import {
  CAR_STATUS_KEY,
  CAR_STATUS_VALUE,
  ACTION_PAGE,
} from "../../../consts/Enum";
import {
  disabledActionCar,
  formatCurrency,
  nameButtonActionCar,
  totalCount,
} from "../../../utils/common";
import { PRIVATE_ROUTE } from "../../../route.constants";

export default function InventoryPage() {
  const navigate = useHistory();
  const [visible, setVisible] = useState(false);
  const [itemRecord, setItemRecord] = useState({});

  // selector
  const idStore = useSelector(state => state.Auth.idStore);
  const isFetching = useSelector(selectFetchingInventory());
  const isFetchingCountStatus = useSelector(
    selectFetchingInventoryCountStatus()
  );
  const inventoryParams = useSelector(selectInventoryParams());
  const inventoryData = useSelector(selectInventoryList());
  const listStatus = useSelector(selectInventoryCountStatus());

  // callback
  const getInventory = getInventoryListCallback();
  const getCountStatusInventory = getInventoryCountStatusCallback();
  const deleteInventory = inventoryDeleteCallback();
  const updateInventory = updateInventoryCallback();

  const dataColumns = [
    "vin",
    "status",
    "type",
    "year",
    "brand",
    "model",
    "variant",
    "milleage",
    "color",
    "media",
    "price",
    "action",
  ];

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onConfrim = () => {
    hideModal();
    deleteInventory(itemRecord.id, inventoryParams);
  };

  const refeshTable = () => {
    getInventory(inventoryParams);
    getCountStatusInventory();
  };

  const onClickMenuDropdown = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    if (key === "edit") {
      navigate.push(
        `${RouteName.inventory.update}/${ACTION_PAGE.UPDATE}/${record.id}`
      );
      return;
    }
    if (key === "delete") {
      setItemRecord({ ...record });
      showModal();
      return;
    }
    if (key === "booked") {
      updateInventory({ status: CAR_STATUS_KEY.BOOKED }, record.code, () =>
        refeshTable()
      );
      return;
    }
    if (key === "sold") {
      updateInventory({ status: CAR_STATUS_KEY.SOLD }, record.code, () =>
        refeshTable()
      );
      return;
    }
    if (key === "releaseReservation") {
      updateInventory({ status: CAR_STATUS_KEY.AVAILABLE }, record.code, () =>
        refeshTable()
      );
      return;
    }
  };

  const onChangeStatus = (e, record) => {
    e.stopPropagation();
    let status;
    if (record.status === CAR_STATUS_KEY.DRAFT) {
      status = CAR_STATUS_KEY.AVAILABLE;
    } else {
      status = CAR_STATUS_KEY.DRAFT;
    }
    updateInventory({ status: status }, record.code, () => refeshTable());
  };

  const content = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onClickMenuDropdown({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom>
        <ButtonCustom
          width={172}
          height={34}
          onClick={(e) => onChangeStatus(e, record)}
          disabled={disabledActionCar(record.status)}
          bgColor={
            record.status === CAR_STATUS_KEY.DRAFT
              ? UIColor.primaryBtnSuccess
              : UIColor.primaryBtnUnpublish
          }
          color={disabledActionCar(record.status) ? "black" : "white"}
        >
          {nameButtonActionCar(record.status)}
        </ButtonCustom>
      </MenuItemCustom>
      <DividerCustom />
      {record.status !== CAR_STATUS_KEY.DRAFT && (
        <Fragment>
          <MenuItemCustom
            key={
              record.status === CAR_STATUS_KEY.AVAILABLE
                ? "booked"
                : "releaseReservation"
            }
          >
            {record.status === CAR_STATUS_KEY.AVAILABLE
              ? "Booked"
              : "Release Reservation"}
          </MenuItemCustom>
          <MenuItemCustom key="sold">Sold</MenuItemCustom>
          <DividerCustom />
        </Fragment>
      )}
      <MenuItemCustom key="edit">Edit</MenuItemCustom>
      <MenuItemCustom key="delete" color="red">
        Delete
      </MenuItemCustom>
    </MenuCustom>
  );

  const columnConfig = {
    vin: {
      dataIndex: "vin",
      title: "#VIN",
      isUpperCase: true,
    },
    status: {
      dataIndex: "status",
      render: (value) =>
        value === CAR_STATUS_KEY.DRAFT ? (
          <Typography.Text style={{ color: "#8E8C94" }}>
            {CAR_STATUS_VALUE[value]}
          </Typography.Text>
        ) : (
          <Space>
            <Badge color={UIColor.status[camelCase(CAR_STATUS_VALUE[value])]} />
            <Typography.Text>{CAR_STATUS_VALUE[value]}</Typography.Text>
          </Space>
        ),
    },
    milleage: {
      dataIndex: "milleage",
      render: (value) => (value ? `${formatCurrency(value)}` : "-"),
    },
    color: {
      dataIndex: "color",
      render: (value) => (
        <Space>
          {value.map((item) => (
            <div style={{ width: 16, height: 16, background: item, border: "1px solid #C4C4C4" }} />
          ))}
        </Space>
      ),
    },
    price: {
      dataIndex: "price",
      render: (value) => `IDR ${formatCurrency(value)}`,
    },
    media: {
      dataIndex: "media",
      render: (value) => (
        <Space size={12}>
          <Space>
            <Icon component={ImageSvg} width={14} height={14} />
            <Typography.Text>{value.image}</Typography.Text>
          </Space>
          <Space>
            <Icon component={Mp4Svg} width={13} height={14} />
            <Typography.Text>{value.video}</Typography.Text>
          </Space>
        </Space>
      ),
    },
    action: {
      dataIndex: "action",
      render: (value, record) => (
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
      ),
    },
  };

  useEffect(() => {
    getInventory && getInventory(Object.assign(inventoryParams, { page: 1 }));
    getCountStatusInventory && getCountStatusInventory();
  }, []);

  const onClickRow = (id) =>
    navigate.push(`${RouteName.inventory.detail}/${id}`);

  const onNavigateCreate = () =>
    navigate.push(`${RouteName.inventory.create}/${ACTION_PAGE.CREATE}`);

  const onChangeTable = (params) => {
    getInventory(Object.assign(inventoryParams, params));
  };

  return (
    <div>
      {totalCount(listStatus) > 0 ? (
        <TableRoot
          onClickRow={onClickRow}
          dataColumns={dataColumns}
          columnConfig={columnConfig}
          dataSource={inventoryData}
          listStatus={listStatus}
          loading={isFetching}
          isFilter={false}
          loadingFilter={isFetchingCountStatus}
          gridColumns="2fr 1fr 120px"
          pagination={inventoryParams}
          onChange={onChangeTable}
          nameStatus="status"
          nameSearch="q"
          extraAction={() => (
            <ButtonCustom
              onClick={onNavigateCreate}
              type="text"
              height={48}
              icon={<Icon component={PlusSvg} width={20} height={20} />}
            >
              ADD CAR
            </ButtonCustom>
          )}
        />
      ) : (
        <Fragment>
          {!idStore && (
            <BoxAlert>
              <AlertStyled
                closable
                message={
                  <RowStyled style={{ marginBottom: 8 }} gap={8}>
                    <img src={InfoImage} width={18} height={18} />
                    <ITitle color="#001948">REQUEST ONLINE STORE</ITitle>
                  </RowStyled>
                }
                description={
                  <IText fSie={13} color={UIColor.gray._2}>
                    Set up your store now to publish your inventory on
                    Marketplace. Click to{" "}
                    <Typography.Link
                      href={`${PRIVATE_ROUTE.SET_UP_STORE}`}
                      strong
                    >
                      REQUEST STORE
                    </Typography.Link>
                  </IText>
                }
              />
            </BoxAlert>
          )}
          <BlockEmptyInventory>
            <Icon component={EmptyInventorySvg} />
            <ITitle color="#222222" fSize={24}>
              No items in Inventory
            </ITitle>
            <IText fSize={14}>
              Try to add your first car in inventory list and start to scale
              your business up.
            </IText>
            <ButtonCustom
              icon={<Icon component={PlusSvg} style={{ marginRight: 8 }} />}
              width={135}
              height={50}
              onClick={onNavigateCreate}
            >
              ADD CAR
            </ButtonCustom>
          </BlockEmptyInventory>
        </Fragment>
      )}

      <Modal
        title="Notification"
        visible={visible}
        onOk={onConfrim}
        onCancel={hideModal}
        confirmLoading={isFetching}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>
          Do you want to delete this{" "}
          <IText fSize={14} strong>
            {itemRecord.vin}
          </IText>
          . Click{" "}
          <IText fSize={14} strong>
            Yes to delete!
          </IText>
        </p>
      </Modal>
    </div>
  );
}
