import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Disclaimer as DisclaimerContent } from "../../components/Disclaimer";
import { Header } from "../../components/Header";

const Disclaimer = () => {
  const { t } = useTranslation("disclaimer");
  return (
    <Wrapper>
      <Header backPath="/" name={t("name")} />
      <h3>{t("message.you_accepted")}</h3>
      <DisclaimerContent />
    </Wrapper>
  );
};

export default Disclaimer;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  background-color: #fff;
  height: 100%;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }
`;
