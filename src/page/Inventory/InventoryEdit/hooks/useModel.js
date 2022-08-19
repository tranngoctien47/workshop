import React, { useState, useEffect, useMemo } from "react";
import InventoryService from "../../../../service/inventory.service";
import { parseSelect } from "../../../../utils/common";

export default function useModel(codeBrand, dataBrand) {
    const [listModel, setListModel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState("");

    const params = useMemo(()=>{
        return codeBrand
    },[codeBrand])

    const listDataBrand = useMemo(()=>{
        return dataBrand;
    },[dataBrand])

    const fetchApi = async (code) => {
        try {
            const idBrand = listDataBrand.find(el => el.key === code).id;
            const res = await InventoryService.LIST_MODEL({ brandId: idBrand });
            setListModel([...parseSelect(res.data)]);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params) {
            fetchApi(params);
        }
    }, [params, isFetching, listDataBrand]);

    return [listModel, loading, setIsFetching];
}
