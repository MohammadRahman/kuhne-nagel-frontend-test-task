import { ShipmentFormProps } from '../../interface/shipments';
import styled from 'styled-components';
import FormRowVertical from '../../ui/FormRowVertical';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/app/hooks';
import { updateShipment } from '../../redux/slices/shipments';

const Form = styled.form`
    width: 100%;
    border-top: 1px solid var(--color-grey-100);
    padding: 1rem 2rem;
`
const FormInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
  column-gap: 3rem;
  padding: 1.5rem 3rem 5rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const FormInput = styled.input`
  border: none;
  padding: 0.6rem 1rem;
  opacity: 0.5;
  border-radius: 2px;
  background-color: var(--color-grey-200);
  &:focus {
    outline: none;
  }
`;
const ShipmentForm = ({ data, onCloseModal }: ShipmentFormProps) => {
  const dispatch = useAppDispatch();
  const { orderNo: updateId } = data;
  const isUpdateSession = Boolean(updateId);
  const { register, handleSubmit } = useForm({
    defaultValues: isUpdateSession ? data : {},
  });

  function formHandler(values: ShipmentFormProps["data"]) {
    dispatch(updateShipment(values));
    onCloseModal?.();
  }
  return (
    <Form onSubmit={handleSubmit(formHandler)}>
      <p>SHIPMENT DETAILS</p>
      <FormInputWrapper>
        <FormRowVertical label="orderNo">
          <FormInput
            id="orderNo"
            disabled={isUpdateSession}
            type="text"
            {...register("orderNo")}
          />
        </FormRowVertical>
        <FormRowVertical label="date">
          <FormInput
            id="date"
            type="text"
            disabled={isUpdateSession}
            {...register("date")}
          />
        </FormRowVertical>
        <FormRowVertical label="customer">
          <FormInput
            id="customer"
            type="text"
            disabled={isUpdateSession}
            {...register("customer")}
          />
        </FormRowVertical>
        <FormRowVertical label="trackingNo">
          <FormInput id="trackingNo" type="text" {...register("trackingNo")} />
        </FormRowVertical>
        <FormRowVertical label="consignee">
          <FormInput id="consignee" type="text" {...register("consignee")} />
        </FormRowVertical>
        <FormRowVertical label="status">
          <FormInput id="status" type="text" {...register("status")} />
        </FormRowVertical>
        <div>
          <button onClick={() => onCloseModal?.()}>cancel</button>
          <button type="submit">{isUpdateSession ? "update" : "create"}</button>
        </div>
      </FormInputWrapper>
    </Form>
  );
};

export default ShipmentForm