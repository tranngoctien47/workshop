import React, { useState, useEffect } from "react";
import InventoryService from "../../../../service/inventory.service";
import { parseSelect } from "../../../../utils/common";

export default function useBrand() {
  const [listBrand, setListBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const res = await InventoryService.LIST_BRAND();
      setListBrand([...parseSelect(res.data)]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return [listBrand, loading];
}
