import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import LockIcon from "@material-ui/icons/Lock";
import { isEmpty } from "ramda";
import { useLocalStorage } from "../../hooks/useLocalStorage";
const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useLocalStorage();

  const handleLogin = () => {
    login(password);
  };

  return (
    <PageWrapper>
      <Wrapper>
        <Unlock />
        <div>請輸入密碼解鎖</div>
        <InputWrapper>
          <TextField
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              disabled={isEmpty(password)}
              onClick={handleLogin}
            >
              解鎖
            </Button>
          </ButtonWrapper>
        </InputWrapper>
      </Wrapper>
    </PageWrapper>
  );
};

export default Login;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
`;

const Unlock = styled(LockIcon)`
  margin: 0 auto 32px auto;
`;

const ButtonWrapper = styled.div`
  margin-top: 12px;
`;

const InputWrapper = styled.div`
  font-size: 12px;
  margin: 24px 0;

  & input {
    text-align: center;
  }
`;
