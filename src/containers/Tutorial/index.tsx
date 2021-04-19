import { Button, Step, StepLabel, Stepper } from "@material-ui/core";
import { isEmpty } from "ramda";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

import { useTravelRecord } from "../../hooks/useTravelRecord";
import { AddToHomeScreen } from "./AddToHomeScreen";
import { Disclaimer } from "./Disclaimer";
import { SetupPassword } from "./SetupPassword";

enum steps {
  ADD_TO_HOME_SCREEN = "ADD_TO_HOME_SCREEN",
  DISCLAIMER = "DISCLAIMER",
  SET_UP_PASSWORD = "SET_UP_PASSWORD",
}

const stepsSettings = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (value: string) => void;
}) => [
  {
    key: steps.ADD_TO_HOME_SCREEN,
    name: "新增至主畫面",
    nextButtonText: "做好啦",
    component: <AddToHomeScreen />,
  },
  {
    key: steps.DISCLAIMER,
    name: "免責聲明",
    nextButtonText: "我同意",
    component: <Disclaimer />,
  },
  {
    key: steps.SET_UP_PASSWORD,
    name: "設定密碼",
    nextButtonText: !isEmpty(password) ? "設定" : "跳過",
    component: <SetupPassword value={password} onChange={setPassword} />,
  },
];

const Tutorial = ({
  setFinishedTutorial,
}: {
  setFinishedTutorial: (value: boolean) => void;
}) => {
  const { encryptTravelRecord } = useTravelRecord();

  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState("");

  const {
    activeStepComponent: { component, nextButtonText },
    isLastStep,
    allStep,
  } = useMemo(() => {
    const allStep = stepsSettings({ password, setPassword });

    return {
      allStep,
      activeStepComponent: allStep[activeStep] || {},
      isLastStep: activeStep === allStep.length - 1,
    };
  }, [activeStep, password, setPassword]);

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
          上一頁
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNext}>
          {nextButtonText ? nextButtonText : isLastStep ? "完成" : "下一頁"}
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
