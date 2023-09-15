/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import SETTINGS_BUTTON from '../../data/settings.json'
import { useContext } from "react";
import { SettingsContext } from "../../ui/Settings";


const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.span`
  margin-right: 8px;
`;
interface ToggleButtonProps {
  active: any
}
const ToggleButton = styled.div<ToggleButtonProps>`
  width: 50px;
  height: 24px;
  background-color: ${(props) => (props.active ? "#4CAF50" : "lightgrey")};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.active ? "flex-end" : "flex-start")};
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.3s, justify-content 0.3s;
`;
interface TogglerProps{
  active: any
}
const Toggler = styled.div<TogglerProps>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transform: translateX(${(props) => (props.active ? "" : "2px")});
  transition: transform 0.3s;
`;
const StyledToggleContainer = styled.div`
display: flex;
gap: 1rem;
justify-content: space-between;
align-items: flex-start;
width: 100%;
`
const StyledToggleLabel = styled.label`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const AddToSettings = () => {
 
  const { activeToggle, toggleHandler } = useContext(SettingsContext);

  return (
    <>
      {SETTINGS_BUTTON.map((element) => {
        return (
          <StyledToggleContainer key={element.value}>
            <StyledToggleLabel>{element.label}</StyledToggleLabel>
            <ToggleContainer>
              <ToggleButton
                active={activeToggle[element.value]}
                onClick={() => toggleHandler(element.value)}
              >
                <Toggler active={activeToggle[element.value]} />
              </ToggleButton>
              <ToggleLabel>{activeToggle ? "On" : "Off"}</ToggleLabel>
            </ToggleContainer>
          </StyledToggleContainer>
        );
      })}
    </>
  );
};

export default AddToSettings;