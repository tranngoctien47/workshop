import { Col, Row, Space, Image } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import { Box, IText, ITextBlack, ITitle } from "../../../../components";
import { SHIPPING_METHOD } from "../../../../consts/Enum";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { CardSelected, CheckCard } from "../MarketplaceBooking.styles";
import Icon from "@ant-design/icons";
import UIColor from "../../../../colors";
import { InStorePickupSvg, LocalDeliveryCheckedSvg, LocationSvg, MapBooking } from "../../../../assets/images/blimobil";

export default function ShippingMethod() {

    // select
    const marketplaceBooking = useSelector(selectMarketBooking());

    // callback
    const updateMarketplaceBooking = updateMarketplaceBookingCallback();

    const updateBooking = (data) => updateMarketplaceBooking({ ...data });

    return (
        <Row gutter={[24, 24]}>
            <Col xl={12}>
                <CardSelected
                    onClick={() =>
                        updateBooking({
                            shippingMethod: SHIPPING_METHOD.LOCAL_DELIVERY,
                        })
                    }
                    isActive={
                        marketplaceBooking.shippingMethod === SHIPPING_METHOD.LOCAL_DELIVERY
                    }
                >
                    <Box justify="space-between" items="center">
                        <Space size={12}>
                            <Icon
                                style={{
                                    color:
                                        marketplaceBooking.shippingMethod ===
                                            SHIPPING_METHOD.LOCAL_DELIVERY
                                            ? UIColor.blue._12
                                            : UIColor.gray._10,
                                }}
                                component={LocalDeliveryCheckedSvg}
                            />
                            <Space size={0} direction="vertical">
                                <ITitle>Local Delivery</ITitle>
                                <IText
                                    fSize={12}
                                    color={
                                        marketplaceBooking.shippingMethod ===
                                            SHIPPING_METHOD.LOCAL_DELIVERY
                                            ? UIColor.blue._6
                                            : UIColor.gray._8
                                    }
                                >
                                    Free
                                </IText>
                            </Space>
                        </Space>
                        <CheckCard
                            isActive={
                                marketplaceBooking.shippingMethod ===
                                SHIPPING_METHOD.LOCAL_DELIVERY
                            }
                        />
                    </Box>
                </CardSelected>
            </Col>
            <Col xl={12}>
                <CardSelected
                    onClick={() =>
                        updateBooking({
                            shippingMethod: SHIPPING_METHOD.IN_STORE_PICKUP,
                        })
                    }
                    isActive={
                        marketplaceBooking.shippingMethod ===
                        SHIPPING_METHOD.IN_STORE_PICKUP
                    }
                >
                    <Box justify="space-between" items="center">
                        <Space size={12}>
                            <Icon
                                style={{
                                    color:
                                        marketplaceBooking.shippingMethod ===
                                            SHIPPING_METHOD.IN_STORE_PICKUP
                                            ? UIColor.blue._12
                                            : UIColor.gray._10,
                                    width: 30,
                                    height: 30
                                }}
                                component={InStorePickupSvg}
                            />
                            <Space size={0} direction="vertical">
                                <ITitle>In-store Pickup</ITitle>
                                <IText
                                    fSize={12}
                                    color={
                                        marketplaceBooking.shippingMethod ===
                                            SHIPPING_METHOD.IN_STORE_PICKUP
                                            ? UIColor.blue._6
                                            : UIColor.gray._8
                                    }
                                >
                                    Free
                                </IText>
                            </Space>
                        </Space>
                        <CheckCard
                            isActive={
                                marketplaceBooking.shippingMethod ===
                                SHIPPING_METHOD.IN_STORE_PICKUP
                            }
                        />
                    </Box>
                </CardSelected>
            </Col>
            {marketplaceBooking.shippingMethod ===
                SHIPPING_METHOD.IN_STORE_PICKUP && (
                    <Fragment>
                        <Col span={24}>
                            <Image src={MapBooking} width="100%" height={180} />
                        </Col>
                        <Col span={24}>
                            <Box
                                justify="space-between"
                                items="start"
                                gap={12}
                                style={{ width: "100%" }}
                            >
                                <Space align="start" size={14}>
                                    <Icon component={LocationSvg} />
                                    <Space direction="vertical" size={0}>
                                        <ITitle color={UIColor.blue._3}>Maxindo Center</ITitle>
                                        <ITextBlack fSize={13}>
                                            1090 Adrenaline Street, Maryland District, Jakarta,
                                            Indonesia
                                        </ITextBlack>
                                        <IText fSize={12}>Opens 8:30-18:30 (Mon-Sat)</IText>
                                    </Space>
                                </Space>
                                <IText color={UIColor.blue._6}>~7,1 km</IText>
                            </Box>
                        </Col>
                    </Fragment>
                )}
        </Row>
    );
}
