import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;
interface PaginationButtonProps{
    active?: any
}
const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const SHIPMENTS_LENGTH = 99;
function Pagination() { 

  const [searchParams, setSearchParams] = useSearchParams()
  const currentNo = Number(searchParams.get('after')) || 1
  const newCount = currentNo + 10;

  
  const subStract = currentNo - 10

  function nextPage() {
    if (newCount >= SHIPMENTS_LENGTH) {
      searchParams.set("after", String(newCount));
      setSearchParams(searchParams);
      toast.error('you are already at last page')
      return null;
    }
      searchParams.set("after", String(newCount));
      setSearchParams(searchParams); 
  }
  function prevPage() {
    if (newCount <= 20) {
      toast.error("you are already at first page");
      return null;
    } else {
      searchParams.set("after", String(subStract));
      setSearchParams(searchParams);
    } 
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{currentNo}</span> to {''}
        <span>{currentNo+10}</span> {''} of {''}
        <span>{SHIPMENTS_LENGTH}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
