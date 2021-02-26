import { Button, Step, StepLabel, Stepper } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AddToHomeScreen } from "./AddToHomeScreen";
import { Disclaimer } from "./Disclaimer";

enum steps {
  ADD_TO_HOME_SCREEN = "ADD_TO_HOME_SCREEN",
  DISCLAIMER = "DISCLAIMER",
}

const stepsSettings = [
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
];

const Tutorial = () => {
  const { setFinishedTutorial } = useLocalStorage();

  const [activeStep, setActiveStep] = useState(0);
  const { component, nextButtonText, isLastStep } = useMemo(
    () => ({
      ...(stepsSettings[activeStep] || {}),
      isLastStep: activeStep === stepsSettings.length - 1,
    }),
    [activeStep]
  );

  const handleNext = () => {
    if (isLastStep) {
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
        {stepsSettings.map(({ key, name }) => (
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
