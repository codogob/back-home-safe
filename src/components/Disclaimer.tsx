import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const Disclaimer = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <p>{t("global:disclaimer.1")}</p>
      <p>{t("global:disclaimer.2")}</p>
      <p>{t("global:disclaimer.3")}</p>
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
`;
