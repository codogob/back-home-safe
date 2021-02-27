import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SetupPassword = ({ value, onChange }: Props) => {
  return (
    <Wrapper>
      <h2>設定密碼</h2>
      <p>密碼用於加密出行紀錄</p>
      <TextField
        type="password"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }

  & input {
    text-align: center;
  }
`;
