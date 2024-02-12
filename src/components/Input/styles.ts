import styled from "styled-components";

export const StyledInput = styled.input`
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
  padding: 10px;
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const InputValueExceededError = styled.div`
color: red;
width: 100%;
font-size: 10px;
`

export const InputFieldContainer = styled.div`
width: 50%;
margin-bottom: 20px;
`
