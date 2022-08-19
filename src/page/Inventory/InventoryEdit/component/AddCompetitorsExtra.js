import { PlusOutlined } from "@ant-design/icons";
import React, { Fragment, useState } from "react";
import { IText } from "../../../../components";
import { BlockAddCompetitorProduct, ButtonPlus } from "./component.style";
import ModalCompetiorsExtra from "./ModalCompetiorsExtra";

export default function AddCompetitorsExtra() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <BlockAddCompetitorProduct onClick={showModal}>
        <ButtonPlus>
          <PlusOutlined style={{ color: "white", fontSize: 20 }} />
        </ButtonPlus>
        <IText fSize={12}>Add competitor’s product</IText>
      </BlockAddCompetitorProduct>
      <ModalCompetiorsExtra onCancel={handleCancel} visible={isModalVisible} />
    </Fragment>
  );
}
