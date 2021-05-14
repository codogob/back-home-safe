import { Button, Snackbar, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Alert } from "@material-ui/lab";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useLock } from "../../hooks/useLock";
import { clearAllData } from "../../utils/clearAllData";

const Login = () => {
  const { t } = useTranslation("login");
  const [password, setPassword] = useState("");
  const { unlock } = useLock();
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleLogin = () => {
    const success = unlock(password);

    if (!success) {
      setShowPasswordError(true);
      setPassword("");
    }
  };

  return (
    <PageWrapper>
      <Wrapper>
        <Unlock />
        <div>{t("message.please_input_password")}</div>
        <InputWrapper
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            type="password"
            autoComplete="current-password"
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
              type="submit"
            >
              {t("global:button.unlock")}
            </Button>
          </ButtonWrapper>
        </InputWrapper>
        <Button onClick={clearAllData}>{t("button.reset")}</Button>
      </Wrapper>
      <Snackbar
        open={showPasswordError}
        autoHideDuration={2000}
        onClose={() => {
          setShowPasswordError(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {t("message.wrong_password")}
        </Alert>
      </Snackbar>
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

const InputWrapper = styled.form`
  font-size: 12px;
  margin: 24px 0;

  & input {
    text-align: center;
  }
`;
