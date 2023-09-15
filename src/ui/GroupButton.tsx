import styled, {css} from "styled-components"
import FILTER_BUTTONS from '../data/filterButtons.json'
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const StyledGroupButton = styled.div`
    height: 5rem;
    border: 1px solid var(--color-grey-100);
    display: flex;
    padding: 0 1rem;
    align-items: center;
`
interface ButtonProps {
  isactive: string;
}
const StyledButton = styled.button<ButtonProps>`
  padding: 0.2rem 1rem;
  border: none;
  outline: none;
  color: black;
  text-transform: uppercase;
  background-color: var(--color-grey-100);
  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isactive &&
    css`
      background-color: var(--color-brand);
      border-radius: 2px;
      color: white;
    `}
`;
const GroupButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clickedButton, setClickedButton] = useState<string>('')
    const [filteredText, setFilterdText] = useSearchParams()

  const currentFilter = filteredText.get('filterBy') || FILTER_BUTTONS[0].value
    function handler(value: string) {
        setClickedButton(value)
        filteredText.set("filterBy", value.replace(/\s/g, '').toLowerCase());
        setFilterdText(filteredText)
    }

    return (
      <StyledGroupButton>
        {FILTER_BUTTONS.map((button) => (
          <StyledButton
            key={button.value}
            onClick={() => handler(button.value)}
            isactive={button.value === currentFilter ? 'isActive' : ''}
            disabled={button.value === currentFilter}
          >
            {button.label.replace('-','')}
          </StyledButton>
        ))}
      </StyledGroupButton>
    );
}

export default GroupButton