import styled from "styled-components";

export const ConfirmButton = styled.button<{ shadowed?: boolean }>`
  display: block;
  margin: auto;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 10px 0;
  width: 80%;
  border-radius: 48px;
  background-color: #fed426;
  border: 0;
  outline: none;
  ${(props) =>
    props.shadowed ? "box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);" : ""}

  &:focus {
    outline: none;
    text-decoration: none;
  }
`;

export const ModalConfirmButton = styled(ConfirmButton)`
  font-size: 16px;
  padding: 12px 0;
  width: 90%;
`;
