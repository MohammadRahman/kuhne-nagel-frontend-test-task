/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import { Children, ModalContextProps, ModalOpenProps, ModalWindowProps } from "../interface/modal"
import styled from "styled-components"
import { HiXMark } from "react-icons/hi2";
import { useOutSideClick } from "../hooks/useOutSideClick";


const Overlay = styled.div`
position: fixed;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(4px);
  background-color: var(--backdrop-color);
  z-index: 1000;
  transition: all 0.5s;
`;
interface StyledWindowProps {
  type?: string
}
const StyledWindow = styled.div<StyledWindowProps>`
  position: fixed;
  width: ${(props) => (props.type === "shipment-delete" ? "40%" : "80%")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  /* padding: 3.2rem 4rem; */
  padding: 3.2rem 0;
  transition: all 0.5s;
`;
const WindowCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const ModalContext = createContext<ModalContextProps | undefined>(undefined)


function Modal({ children }: Children) {
   const [openName, setOpenName] = useState<string>("");

   const close = () => setOpenName('');
   const open = (name: string)=> setOpenName(name);
  return <ModalContext.Provider value={{openName, open, close}}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: windowName }: ModalOpenProps) {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children as any, { onClick: () => open(windowName) });
}

const Window = ({ name, children }: ModalWindowProps) => {
  
  const { openName, close } = useContext(ModalContext) as ModalContextProps;
  const ref = useOutSideClick(close);
  
  if (name !== openName) return null;
  
  return createPortal(
    <Overlay>
      <StyledWindow ref={ref} type={name}>
        <WindowCloseButton onClick={close}>
          <HiXMark />
        </WindowCloseButton>
        <div>{cloneElement(children as any,{ onCloseModal: close } )}</div>
      </StyledWindow>
    </Overlay>,
    document.body
  );
}


Modal.Window = Window
Modal.Open = Open
export default Modal

