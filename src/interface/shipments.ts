
export interface Shipment{
    orderNo: string;
    date: string;
    customer: string;
    trackingNo: string;
    status: string;
    consignee: string;
}

export interface StaticShipments{
    shipments: Shipment[]
}
export interface ShipmentRowProps{
    shipment: Shipment
}
export interface ShipmentFormProps{
    data: Shipment
    onCloseModal?: ()=> void
}