import { Divider, Space } from "antd";
import React, { useEffect } from "react";
import UIColor from "../../../colors";
import TableRoot from "../../../components/TableCustom";
import { AvatarCustom, ImageCustom, IText, ITitle } from "../../../components";
import { useHistory } from "react-router";
import RouteName from "../../../routeName";
import { useSelector } from "react-redux";
import { selectFetchingMarketplace } from "../../../reselects/fetchingSelector";
import { GetMarketplaceListCallback as getMarketplaceListCallback } from "../../../callbacks/marketplaceCallback";
import { formatCurrency, textEmpty } from "../../../utils/common";
import {
  selectMarketplaceList,
  selectMarketplaceParams
} from "../../../reselects/marketplaceSelector";
import useWindowSize from "../../../hooks/useWindowSize";
import { size } from "../../../consts/Enum";

export default function MarketplaceListPage() {
  const navigate = useHistory();
  const sizeWindow = useWindowSize();

  // selector
  const isFetching = useSelector(selectFetchingMarketplace());
  const marketplaceParams = useSelector(selectMarketplaceParams());
  const marketplaceData = useSelector(selectMarketplaceList());

  // callback
  const getMarketplace = getMarketplaceListCallback();

  const dataColumns = ["car", "price", "supplier", "location"];

  const columnConfig = {
    car: {
      dataIndex: "car",
      render: (value, record) => (
        <Space size={12}>
          <ImageCustom
            preview={false}
            src={value.thumb}
            width={100}
            height={66}
          />
          <Space size={0} direction="vertical">
            <IText color="black" fSize={14}>
              {value.name}
            </IText>
            <IText color={UIColor.gray._8}>{textEmpty(value.des)}</IText>
          </Space>
        </Space>
      )
    },
    supplier: {
      dataIndex: "supplier",
      render: () => (
        <Space>
          <AvatarCustom src="" size={26} />
          <ITitle fSize={12}>-</ITitle>
        </Space>
      )
    },
    price: {
      dataIndex: "price",
      render: (value) => (
        <IText strong fSize={13}>
          IDR ${formatCurrency(value)}
        </IText>
      )
    },
    location: {
      dataIndex: "location"
    }
  };

  const columnConfigMobile = {
    car: {
      dataIndex: "car",
      render: (value, record) => (
        <Space direction="vertical">
          <Space size={12}>
            <ImageCustom
              preview={false}
              src={value.thumb}
              width={100}
              height={66}
            />
            <Space size={0} direction="vertical">
              <IText color="black" fSize={14}>
                {value.name}
              </IText>
              <IText color={UIColor.gray._8}>{textEmpty(value.des)}</IText>
              <IText strong fSize={13}>
                IDR ${formatCurrency(record?.price)}
              </IText>
            </Space>
          </Space>
          <Divider style={{margin: 0}}/>
          <Space>
            <AvatarCustom src="" size={26} />
            <ITitle fSize={12}>-</ITitle>
          </Space>
        </Space>
      )
    }
  };

  useEffect(() => {
    getMarketplace &&
      getMarketplace(Object.assign(marketplaceParams, { page: 1 }));
  }, []);

  const onClickRow = (id, record) =>
    navigate.push(`${RouteName.marketplace.detail}/${id}`, {
      supplierCode: record.merchantCode,
      car: record
    });

  const onChangeTable = (params) => {
    getMarketplace(Object.assign(marketplaceParams, params));
  };

  return (
    <div>
      <TableRoot
        onClickRow={onClickRow}
        dataColumns={dataColumns}
        columnConfig={
          sizeWindow.width <= size.xs ? columnConfigMobile : columnConfig
        }
        dataSource={marketplaceData}
        loading={isFetching}
        isFilter={false}
        gridColumns="3fr 2fr"
        pagination={marketplaceParams}
        onChange={onChangeTable}
        nameStatus="status"
        nameSearch="q"
      />
    </div>
  );
}
