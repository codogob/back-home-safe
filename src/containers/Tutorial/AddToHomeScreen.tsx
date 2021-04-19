import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import plus from "../../assets/plus.svg";
import { usePWA } from "../../hooks/usePWA";

export const AddToHomeScreen = () => {
  const { t } = useTranslation("tutorial");
  const { prompt, promptToInstall } = usePWA();

  const onInstall = useCallback(() => {
    if (!prompt) return;
    promptToInstall();
  }, [prompt, promptToInstall]);

  return (
    <Wrapper>
      <AddIcon src={plus} />
      <div>{t("add_to_home_screen.message.add_to_home_screen_first")}</div>
      <div>{t("add_to_home_screen.message.to_act_as_an_app")}</div>
      <InstructionWrapper>
        <div>IOS</div>
        <div>{t("add_to_home_screen.step.ios")}</div>
        <div>Android</div>
        <div>{t("add_to_home_screen.step.android")}</div>
        {prompt && (
          <InstallButtonWrapper>
            <Button variant="contained" onClick={onInstall}>
              {t("global:button.install")}
            </Button>
          </InstallButtonWrapper>
        )}
      </InstructionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
`;

const AddIcon = styled.img`
  width: 100px;
  margin: 0 auto 32px auto;
`;

const InstallButtonWrapper = styled.div`
  margin-top: 12px;
`;

const InstructionWrapper = styled.div`
  font-size: 12px;
  margin: 24px 0;
`;
