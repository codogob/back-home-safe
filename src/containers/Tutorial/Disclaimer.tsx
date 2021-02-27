import React from "react";
import styled from "styled-components";
import { Disclaimer as DisclaimerContent } from "../../components/Disclaimer";

export const Disclaimer = () => {
  return (
    <Wrapper>
      <h2>免責聲明</h2>
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
