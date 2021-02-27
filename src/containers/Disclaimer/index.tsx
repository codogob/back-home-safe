import React from "react";
import styled from "styled-components";
import { Disclaimer as DisclaimerContent } from "../../components/Disclaimer";
import { Header } from "../../components/Header";

const Disclaimer = () => {
  return (
    <Wrapper>
      <Header backPath="/" name="免責聲明" />
      <h3>使用此軟件代表你已同意</h3>
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
