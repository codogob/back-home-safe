import React from "react";
import styled from "styled-components";
import { Input } from "@material-ui/core";

type Props = {
  password: string;
  onChange: (code: string) => void;
};

export const SetPassword = ({ password, onChange }: Props) => {
  return (
    <Wrapper>
      <h2>設定密碼</h2>
      <p>密碼用於加密出行紀錄</p>
      <Input
        type="password"
        value={password}
        onChange={(event) => {
          onChange(event.target.value);
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
