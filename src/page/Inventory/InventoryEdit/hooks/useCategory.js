import React, { useEffect, useState } from "react";
import { CATEGORY_TYPE } from "../../../../consts/Enum";
import InventoryService from "../../../../service/inventory.service";
import { parseSelect, parseFeature } from "../../../../utils/common";
import { dataFeatures, dataCabin, dataSafety, dataLighting } from "../data"

export default function useCategory( category = [] ) {
    const [dataCategory, setDataCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApiAllCate = async (listCategory) => {
        try {
            const arrayPromise = listCategory.map(async (item) => {
                const result = await InventoryService.LIST_CATEGORY({ type: item, all: true })
                if(CATEGORY_TYPE.CAR_FEATURE_CONVENIENCE === item){
                    return parseFeature(result.data, dataFeatures)
                }
                if(CATEGORY_TYPE.CAR_FEATURE_CABIN === item){
                    return parseFeature(result.data, dataCabin)
                }
                if(CATEGORY_TYPE.CAR_FEATURE_SAFETY === item){
                    return parseFeature(result.data, dataSafety)
                }
                if(CATEGORY_TYPE.CAR_FEATURE_LIGHTING === item){
                    return parseFeature(result.data, dataLighting)
                }
                return parseSelect(result.data);
            })
            const res = await Promise.all(arrayPromise);
            setDataCategory([...res]);
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!category.length) return;
        fetchApiAllCate(category)
    }, [])

    return [dataCategory, loading];
}
