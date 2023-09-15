import { Shipment } from '../../interface/shipments';
import Table from '../../ui/Table';
import ShipmentRow from './ShipmentRow';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useShipment } from './useShipment';
import AddToSettings from '../settings/Settings';
import Pagination from '../../ui/Pagination';

const StyledCenterContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  padding: 1.2rem 4.8rem;
  justify-content: center;
  align-items: center;
`;
const SettingsContainer = styled.div`
  width: 300px;
  height: 100px;
  border: 1px solid grey;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ShipmentTable = () => {
  const { staticShipments, status } = useShipment();
  const [searchText] = useSearchParams();

  const orderId = searchText.get("searchText");
  const isSearch = Boolean(orderId);

  const searchByOrderId = staticShipments?.shipments?.filter(
    (shipment) => shipment.orderNo === orderId
  );
  const [filterBy] = useSearchParams();
  const filterByText = filterBy.get("filterBy") || "all";

  const filteredShipments =
    filterByText === "all"
      ? staticShipments?.shipments
      : staticShipments?.shipments?.filter((shipment) =>
          shipment.status
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(filterByText)
        );

  if (status === "loading")
    return (
      <StyledCenterContainer>
        <h2>Loading...</h2>
      </StyledCenterContainer>
    );
  return (
    <>
      <Table columns="1.2fr 0.6fr 1fr 1.2fr 0.6fr 1.2fr 0.6fr">
        <Table.Header>
          <div>orderno</div>
          <div>deliverydate</div>
          <div>customer</div>
          <div>trackingno</div>
          <div>status</div>
          <div>consignee</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={isSearch ? searchByOrderId : filteredShipments}
          render={(shipment: Shipment) => (
            <ShipmentRow shipment={shipment} key={shipment.orderNo} />
          )}
        />
        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
      <SettingsContainer>
        <h2>Settings</h2>
        <AddToSettings />
      </SettingsContainer>
    </>
  );
}

export default ShipmentTable