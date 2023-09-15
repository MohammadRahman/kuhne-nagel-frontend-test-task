import { ShipmentRowProps } from '../../interface/shipments';
import Table from '../../ui/Table';
import styled from "styled-components";
import { HiOutlineCalendarDays, HiOutlineXMark } from "react-icons/hi2";
import Modal from '../../ui/Modal';
import ShipmentForm from './ShipmentForm';
import ShipmentDelete from './ShipmentDelete';
const OrderNo = styled.div`

`
const DeliveryDate = styled.div`
    
`
const Customer = styled.div`
    
`
const TrackingNo = styled.div`
    
`
const Status = styled.div`
    
`
const Consignee = styled.div`
    
`
const IconBoxCommon = styled.div`
  width: 35px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;
`;
const StyledIconWindowBox = styled(IconBoxCommon)`
  background-color: var(--color-details);
`;
const StyledIconXMarkBox = styled(IconBoxCommon)`
  background-color: #fb466a;
`;
const StyledIconWindow = styled(HiOutlineCalendarDays)`
  color: white;
`;
const StyledIconXMark = styled(HiOutlineXMark)`
  /* background-color: white; */
  color: white;
`;
const ActionIconBox = styled.div`
    display: flex;
    gap: 1rem;
`
const ShipmentRow = ({ shipment }: ShipmentRowProps) => {

  return (
    <Table.Row>
      <OrderNo>{shipment.orderNo}</OrderNo>
      <DeliveryDate>{shipment.date}</DeliveryDate>
      <Customer>{shipment.customer}</Customer>
      <TrackingNo>{shipment.trackingNo}</TrackingNo>
      <Status>{shipment.status}</Status>
      <Consignee>{shipment.consignee}</Consignee>
      <ActionIconBox>
        <Modal>
          <Modal.Open opens="shipment-details">
            <StyledIconWindowBox>
              <StyledIconWindow />
            </StyledIconWindowBox>
          </Modal.Open>
          <Modal.Window name="shipment-details">
            <ShipmentForm data={shipment} />
          </Modal.Window>
          <Modal.Open opens='shipment-delete'>
            <StyledIconXMarkBox>
              <StyledIconXMark />
            </StyledIconXMarkBox>
          </Modal.Open>
          <Modal.Window name='shipment-delete'>
            <ShipmentDelete shipment={ shipment} />   
          </Modal.Window>
        </Modal>
      </ActionIconBox>
    </Table.Row>
  );
};

export default ShipmentRow