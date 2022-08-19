import React, { useEffect, useState } from "react";
import InventoryService from "../../../../service/inventory.service";
import { parseSelect } from "../../../../utils/common";

export default function useLocation() {
  const [listLoation, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const res = await InventoryService.LIST_LOCATION();
      setLocation([...parseSelect(res.data)])
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return [listLoation, loading];
}
