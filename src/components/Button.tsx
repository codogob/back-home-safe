import styled from "styled-components";

export const Button = styled.button`
  display: block;
  margin: auto;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 10px 0;
  width: 80%;
  border-radius: 48px;
  background-color: #fed426;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border: 0;
  outline: none;

  &:focus {
    outline: none;
    text-decoration: none;
  }
`;
