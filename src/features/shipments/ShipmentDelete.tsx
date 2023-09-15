import { ShipmentRowProps } from '../../interface/shipments'
import styled from 'styled-components'
import { useAppDispatch } from '../../redux/app/hooks'
import { deleteShipment } from '../../redux/slices/shipments'



const StyledShipmentDelete = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: 2rem;
padding: 2rem 1rem;
border: 1px solid var(--color-grey-100);
`
const DeleteBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StyledButtonBox = styled.div`
    margin-top: 2rem;
`
const CommonStyle = styled.button`
  padding: 0.2rem 1rem;
  border-radius: 2px;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
  &:focus {
    outline: none;
  }
`;

const StyledCancelButton = styled(CommonStyle)`
    background-color: var(--color-brand);
`
const StyledDeleteButton = styled(CommonStyle)`
  margin-left: 1rem;
  background-color: var(--color-delete);
`;
const ShipmentDelete = ({ shipment }: ShipmentRowProps) => {
  const dispatch = useAppDispatch();
    return (
      <StyledShipmentDelete>
        <p>Delete shipment # {shipment.orderNo}</p>
        <DeleteBox>
          <p>click confirm to permanently remove form shipment list.</p>
          <StyledButtonBox>
            <StyledCancelButton>cancel</StyledCancelButton>
            <StyledDeleteButton
              onClick={() => dispatch(deleteShipment(shipment.orderNo))}
           type='button' >
              confirm
            </StyledDeleteButton>
          </StyledButtonBox>
        </DeleteBox>
      </StyledShipmentDelete>
    );
};

export default ShipmentDelete