import React, { useState } from "react";

export default function useDrawer() {
  const [visible, setVisible] = useState(false);

  return [visible, setVisible];
}
