import {
  CaretDownOutlined,
  LoadingOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Space, Spin } from "antd";
import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import UIColor from "../../../../colors";
import {
  Box,
  ButtonCustom,
  IText,
  ITextBlack,
  ITitle,
  UploadList,
} from "../../../../components";
import { SelectField } from "../../../../components/Form/form.style";
import { FINANCE_OPTIONS } from "../../../../consts/Enum";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { FinanceService } from "../../../../service";
import { CardSelected, CheckCard } from "../MarketplaceBooking.styles";

export default function FinanceOptions() {
  const [loadingFinanceCompany, setLoadingFinanceCompany] = useState(true);
  const [listFinanceCompany, setListFinanceCompany] = useState([]);

  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  const updateBooking = (data) => updateMarketplaceBooking({ ...data });

  const fetchListFinanceCompany = async () => {
    try {
      const result = await FinanceService.FINANCE_LIST_DEALER();
      const parseSelect = result.data.map((item) => {
        const key = item.code;
        const label = item.contactName;
        return { key, label };
      });
      setListFinanceCompany([...parseSelect]);
    } catch (error) {
    } finally {
      setLoadingFinanceCompany(false);
    }
  };

  useEffect(() => {
    fetchListFinanceCompany();
  }, []);

  const componentUpload = () => (
    <ButtonCustom
      color={UIColor.gray._5}
      bgColor={UIColor.gray._11}
      icon={<PaperClipOutlined style={{ color: UIColor.gray._2 }} />}
    >
      UPLOAD
    </ButtonCustom>
  );

  const antIcon = <LoadingOutlined spin />;

  return (
    <Row gutter={[24, 24]}>
      <Col xl={12}>
        <CardSelected
          onClick={() =>
            updateBooking({ financeOptions: FINANCE_OPTIONS.PAY_IN_FULL })
          }
          isActive={
            marketplaceBooking.financeOptions === FINANCE_OPTIONS.PAY_IN_FULL
          }
        >
          <Box justify="space-between" items="center">
            <Space size={0} direction="vertical">
              <ITitle>Pay in Full</ITitle>
              <IText
                fSize={12}
                color={
                  marketplaceBooking.financeOptions ===
                  FINANCE_OPTIONS.PAY_IN_FULL
                    ? UIColor.blue._6
                    : UIColor.gray._8
                }
              >
                Pay 100% to Blimobil{" "}
              </IText>
            </Space>
            <CheckCard
              isActive={
                marketplaceBooking.financeOptions ===
                FINANCE_OPTIONS.PAY_IN_FULL
              }
            />
          </Box>
        </CardSelected>
      </Col>
      <Col xl={12}>
        <CardSelected
          onClick={() =>
            updateBooking({
              financeOptions: FINANCE_OPTIONS.PERSONAL_LOAN,
            })
          }
          isActive={
            marketplaceBooking.financeOptions === FINANCE_OPTIONS.PERSONAL_LOAN
          }
        >
          <Box justify="space-between" items="center">
            <Space size={0} direction="vertical">
              <ITitle>Personal Loan</ITitle>
              <IText
                fSize={12}
                color={
                  marketplaceBooking.financeOptions ===
                  FINANCE_OPTIONS.PERSONAL_LOAN
                    ? UIColor.blue._6
                    : UIColor.gray._8
                }
              >
                Choose a finance company
              </IText>
            </Space>
            <CheckCard
              isActive={
                marketplaceBooking.financeOptions ===
                FINANCE_OPTIONS.PERSONAL_LOAN
              }
            />
          </Box>
        </CardSelected>
      </Col>
      {marketplaceBooking.financeOptions === FINANCE_OPTIONS.PERSONAL_LOAN && (
        <Fragment>
          <Col span={24}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <ITextBlack>
                Finance Company <strong style={{ color: "red" }}>*</strong>
              </ITextBlack>
              <SelectField
                onChange={(key, option) => {
                  updateBooking({
                    financeCode: key,
                    financeLabel: option.children,
                  });
                }}
                placeholder="Select Finance Company"
                suffixIcon={
                  loadingFinanceCompany ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <CaretDownOutlined style={{ color: "#666666" }} />
                  )
                }
              >
                {listFinanceCompany.map((item) => (
                  <Select.Option key={item.key}>{item.label}</Select.Option>
                ))}
              </SelectField>
              <IText color={UIColor.gray._7}>
                You pay <strong>30%</strong> to Blimobil first and Gaumata will
                pay <strong>70%</strong>
              </IText>
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical">
              <ITextBlack>Contract</ITextBlack>
              <UploadList
                fileList={marketplaceBooking.mediaConact}
                maxLength={1}
                onChange={(newFileList) =>
                  updateBooking({ mediaConact: newFileList })
                }
                componentUpload={componentUpload}
                isComponentUpload={true}
                listType="text"
              />
            </Space>
          </Col>
        </Fragment>
      )}
    </Row>
  );
}
