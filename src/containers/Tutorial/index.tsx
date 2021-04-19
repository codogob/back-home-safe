import { Button, Step, StepLabel, Stepper } from "@material-ui/core";
import { TFunction } from "i18next";
import { isEmpty } from "ramda";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useTravelRecord } from "../../hooks/useTravelRecord";
import { AddToHomeScreen } from "./AddToHomeScreen";
import { Disclaimer } from "./Disclaimer";
import { Language } from "./Language";
import { SetupPassword } from "./SetupPassword";

enum steps {
  LANGUAGE = "LANGUAGE",
  ADD_TO_HOME_SCREEN = "ADD_TO_HOME_SCREEN",
  DISCLAIMER = "DISCLAIMER",
  SET_UP_PASSWORD = "SET_UP_PASSWORD",
}

const stepsSettings = ({
  t,
  password,
  setPassword,
}: {
  t: TFunction;
  password: string;
  setPassword: (value: string) => void;
}) => [
  {
    key: steps.LANGUAGE,
    name: t("language.name"),
    nextButtonText: t("global:button.next_page"),
    component: <Language />,
  },
  {
    key: steps.ADD_TO_HOME_SCREEN,
    name: t("add_to_home_screen.name"),
    nextButtonText: t("global:button.complete"),
    component: <AddToHomeScreen />,
  },
  {
    key: steps.DISCLAIMER,
    name: t("disclaimer.name"),
    nextButtonText: t("disclaimer.accept"),
    component: <Disclaimer />,
  },
  {
    key: steps.SET_UP_PASSWORD,
    name: t("setup_password.name"),
    nextButtonText: !isEmpty(password)
      ? t("global:button.set")
      : t("global:button.skip"),
    component: <SetupPassword value={password} onChange={setPassword} />,
  },
];

const Tutorial = ({
  setFinishedTutorial,
}: {
  setFinishedTutorial: (value: boolean) => void;
}) => {
  const { t } = useTranslation("tutorial");
  const { encryptTravelRecord } = useTravelRecord();

  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState("");

  const {
    activeStepComponent: { component, nextButtonText },
    isLastStep,
    allStep,
  } = useMemo(() => {
    const allStep = stepsSettings({ password, setPassword, t });

    return {
      allStep,
      activeStepComponent: allStep[activeStep] || {},
      isLastStep: activeStep === allStep.length - 1,
    };
  }, [activeStep, password, setPassword, t]);

  const handleNext = () => {
    if (isLastStep) {
      !isEmpty(password) && encryptTravelRecord(password);
      setFinishedTutorial(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <PageWrapper>
      <Stepper activeStep={activeStep} alternativeLabel>
        {allStep.map(({ key, name }) => (
          <Step key={key}>
            <StepLabel>{name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <ContentWrapper>{component}</ContentWrapper>
      <ButtonGroup>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          {t("global:button.last_page")}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNext}>
          {nextButtonText
            ? nextButtonText
            : isLastStep
            ? t("global:button.complete")
            : t("global:button.next_page")}
        </Button>
      </ButtonGroup>
    </PageWrapper>
  );
};

export default Tutorial;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const ButtonGroup = styled.div`
  flex-shrink: 0;
  padding: 32px 24px;
  display: flex;
  justify-content: space-between;
`;
