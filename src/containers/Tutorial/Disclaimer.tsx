import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Disclaimer as DisclaimerContent } from "../../components/Disclaimer";

export const Disclaimer = () => {
  const { t } = useTranslation("tutorial");

  return (
    <Wrapper>
      <h2>{t("disclaimer.name")}</h2>
      <DisclaimerContent />
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
