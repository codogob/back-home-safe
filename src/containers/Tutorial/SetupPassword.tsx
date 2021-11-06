import { TextField } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SetupPassword = ({ value, onChange }: Props) => {
  const { t } = useTranslation("tutorial");

  return (
    <Wrapper>
      <h2>
        {t("setup_password.name")}({t("global:form.optional")})
      </h2>
      <p>{t("setup_password.message.password_usage")}</p>
      <TextField
        type="password"
        autoComplete="new-password"
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
