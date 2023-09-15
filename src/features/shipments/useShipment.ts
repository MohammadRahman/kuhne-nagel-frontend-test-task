import { useEffect } from "react";
import { fetchShipmentsData } from "../../redux/slices/shipments";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useSearchParams } from "react-router-dom";


export function useShipment() {
    const [searchParams] = useSearchParams()

    const after = searchParams.get('after') || undefined
    
    const dispatch = useAppDispatch();
    const { shipments: staticShipments, status, error } = useAppSelector((state) => state.shipments);


    useEffect(() => {
        dispatch(fetchShipmentsData(after));

    }, [dispatch, after]);

    return { staticShipments, status, error }
}