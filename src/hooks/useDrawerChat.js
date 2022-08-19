import React, { useState } from "react";

export default function useDrawerChat() {
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  return [visible, setVisible, childrenDrawer, setChildrenDrawer];
}
