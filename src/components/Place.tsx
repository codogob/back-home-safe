import styled from "styled-components";
import React from "react";
import TextareaAutosize from "react-autosize-textarea";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
};

export const Place = ({ value, onChange, placeholder, readOnly }: Props) => {
  return (
    <StyledInput
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(e: any) => {
        onChange && onChange(e.target.value);
      }}
      async
    />
  );
};

export const StyledInput = styled(TextareaAutosize)`
  text-align: center;
  font-size: 32px;
  background-color: transparent;
  border: 0;
  outline: none;
  margin: 4px 0;
  color: #fed426;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  width: 100%;

  padding-left: 0;
  padding-right: 0;
  line-height: 36px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;
