import React, { ReactNode } from 'react'
import styled from 'styled-components';

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const StyledLabel = styled.label`
     font-size: 1.5rem;
     opacity: 0.8;
`
interface FromRowProps{
    label: string;
    children: ReactNode
}
const FormRowVertical = ({ label, children }: FromRowProps) => {
    return <StyledFormRowVertical>
        <StyledLabel htmlFor={children.props.id}>{label}</StyledLabel>
        {children}
  </StyledFormRowVertical>;
};

export default FormRowVertical