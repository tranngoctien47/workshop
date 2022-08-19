import React, { useState } from "react";

export default function useModalChangePassword() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return [isModalVisible, setIsModalVisible];
}
