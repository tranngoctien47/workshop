import {
  Select,
  Space,
  Dropdown,
  Menu,
  Badge,
  Typography,
  Divider,
  Pagination,
  Skeleton,
} from "antd";
import React, { Fragment, useState } from "react";
import {
  BoxFilter,
  ButtonAdd,
  ItemFilter,
  SearchTable,
  SelectFilter,
  TagCountColumn,
  TableStyled,
  BoxFooter,
} from "./TableRoot.style";
import Icon, { DownOutlined } from "@ant-design/icons";
import {
  ColumnSvg,
  FilterSvg,
  PlusSvg,
  SearchSvg,
} from "../../assets/images/blimobil";
import { startCase, upperCase } from "lodash";
import { IText } from "..";
import { isEmpty } from "lodash";
import { textEmpty } from "../../utils/common";

const { Option } = Select;

const menu = <Menu items={[]} />;

export default function TableRoot({
  isSearch = true,
  isFilter = true,
  isSelectColumn = true,
  extraAction = () => { },
  gridColumns = "",
  dataSource = [],
  listStatus = [],
  columnConfig = {},
  dataColumns = [],
  onClickRow = () => { },
  loading = false,
  pagination = {},
  nameStatus = "",
  nameSearch = "",
  onChange = () => { },
  loadingFilter = false,
  componentFilter = ()=> {},
  isComponentFilter= false,
  showPagination = true
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const onChangeFilter = (value, type) => onChange({ [type]: value });

  const onHandleChangeStatus = (status) => {
    setActiveFilter(status);
    onChange({ [nameStatus]: status, page: 1 });
  };

  const ComponentHeader = () => {
    return (
      <BoxFilter
        gridColumns={gridColumns}
        style={{ height: 50, background: "#F9F9F9" }}
      >
        {isSearch && (
          <SearchTable
            defaultValue={pagination[nameSearch]}
            onPressEnter={(e) =>
              onChange({ [nameSearch]: e.target.value, page: 1 })
            }
            prefix={
              <Icon
                component={SearchSvg}
                width={16}
                height={16}
                style={{ marginRight: 12, marginLeft: 12, cursor:"pointer" }}
              />
            }
            bordered={false}
            placeholder="Search..."
          />
        )}
        {isFilter && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              component={FilterSvg}
              width={16}
              height={16}
              style={{ marginRight: 12, marginLeft: 12 }}
            />
            <SelectFilter placeholder="Filter" bordered={false}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </SelectFilter>
          </div>
        )}
        {isSelectColumn && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              component={ColumnSvg}
              width={16}
              height={16}
              style={{ marginRight: 12, marginLeft: 12 }}
            />
            <Dropdown overlay={menu} placement="bottom">
              <SelectFilter
                placeholder="Column to show"
                bordered={false}
                open={false}
                suffixIcon={
                  <Space>
                    <TagCountColumn color="#EEEEEE">12</TagCountColumn>
                    <DownOutlined />
                  </Space>
                }
              />
            </Dropdown>
          </div>
        )}
        {extraAction()}
      </BoxFilter>
    );
  };

  const ComponentFilter = () => {
    return (
      <Space size={loadingFilter ? 12 : 0} style={{ marginTop: 8 }}>
        {loadingFilter
          ? [{}, {}, {}, {}, {}].map((el) => <Skeleton.Button size="large" />)
          : listStatus.map((item) => (
            <ItemFilter
              onClick={() => onHandleChangeStatus(item.key)}
              key={item.key}
              active={activeFilter === item.key}
            >
              {item.color && <Badge color={item.color} />}
              <Typography.Text>{`${item.label} (${item.count})`}</Typography.Text>
            </ItemFilter>
          ))}
      </Space>
    );
  };

  const renderColumns = (props) => {
    let obj = [];
    if (Object.keys(columnConfig).length > 0) {
      if (props.length > 0) {
        props.map((i, k) => {
          if (columnConfig[i] && columnConfig[i]?.render) {
            obj.push({
              title:columnConfig[i]?.title ? columnConfig[i].title : columnConfig[i]?.isUpperCase ? upperCase(i) : startCase(i),
              dataIndex: i,
              key: k,
              render: columnConfig[i].render,
              align: columnConfig[i]?.align ?  columnConfig[i]?.align : "left"
            });
          } else {
            obj.push({
              title:columnConfig[i]?.title ? columnConfig[i].title : columnConfig[i]?.isUpperCase ? upperCase(i) : startCase(i),
              dataIndex: i,
              key: k,
              align: columnConfig[i]?.align ?  columnConfig[i]?.align : "left",
              render: (value) => textEmpty(value),
            });
          }
        });
      }
    }
    return obj;
  };

  return (
    <Fragment>
      <ComponentHeader />
      {isComponentFilter ? componentFilter() : <ComponentFilter />}
      <TableStyled
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => onClickRow(record.id, record ), // click row
            onDoubleClick: (event) => { }, // double click row
            onContextMenu: (event) => { }, // right button click row
            onMouseEnter: (event) => { }, // mouse enter row
            onMouseLeave: (event) => { }, // mouse leave row
          };
        }}
        loading={loading}
        pagination={false}
        footer={() => (
          showPagination && <Fragment>
            <Divider style={{ marginTop: 0 }} dashed={true} />
            <BoxFooter>
              <IText fSize={12} color="#A5A3A9">{`Showing ${(pagination.page - 1) * Number(pagination.recordPerPage) + 1
                } - ${(pagination.page - 1) * Number(pagination.recordPerPage) + Number(pagination.recordPerPage)} of ${pagination.recordTotal || (pagination.page - 1) * 10 + 10
                } results`}</IText>
              <Pagination
                onChange={(value) =>  onChangeFilter(value, "page")}
                current={pagination.page}
                size="small"
                pageSize={pagination.recordPerPage}
                total={pagination.recordTotal}
                showSizeChanger={false}
              />
              <Space>
                <IText color="#A5A3A9" fSize={12}>
                  Items per page
                </IText>
                <Select
                  onChange={(value) => onChange({ recordPerPage: value, page: 1 })}
                  value={pagination.recordPerPage}
                >
                  <Option key={10}>10</Option>
                  <Option key={30}>30</Option>
                  <Option key={50}>50</Option>
                </Select>
              </Space>
            </BoxFooter>
          </Fragment>
        )}
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        columns={renderColumns(dataColumns)}
      />
    </Fragment>
  );
}
