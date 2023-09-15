/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext } from "react"
import styled from "styled-components";
import { Shipment } from "../interface/shipments";
import { useSearchParams } from "react-router-dom";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
interface RowProps{
    columns: string
}
const CommonRow = styled.div<RowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;


interface TableContextProps{
    columns: string
}
interface Children{
    children: ReactNode
}
interface TableBodyProps {
  data: Array<Shipment>;
  render: (shipment: Shipment) => React.ReactNode;
}
const TableContext = createContext<TableContextProps | undefined>(undefined)


const Table = ({ columns,children }: {columns: string, children: ReactNode}) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

function Header({ children }: Children) {
  const { columns } = useContext(TableContext) as TableContextProps;

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }: Children) {
  const { columns } = useContext(TableContext) as TableContextProps;
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }: TableBodyProps) {

  const [searchByOrderNo] = useSearchParams()

  if (
    searchByOrderNo.get("searchText")?.length &&
    !data.find((el) => el.orderNo === searchByOrderNo.get("searchText"))
  ) return <Empty>Shipment with Provided orderId not found!</Empty>;
   
  if (!data?.length) return <Empty>no data to show</Empty>;
  
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table