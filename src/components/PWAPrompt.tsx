import React from "react";
import styled from "styled-components";
import plus from "../../src/assets/plus.svg";

export const PWAPrompt = () => {
  return (
    <Wrapper>
      <AddIcon src={plus} />
      <div>新增至主畫面先啦</div>
      <div>唔係點似個App</div>
      <InstructionWrapper>
        <div>IOS</div>
        <div>{"用Safari開=>分享=>新增至主畫面"}</div>
        <div>Android</div>
        <div>{"用Chrome開=>右上選項=>新增至主畫面/安裝應用程式"}</div>
      </InstructionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
  color: #fff;
`;

const AddIcon = styled.img`
  width: 100px;
  margin: 0 auto 32px auto;
`;

const InstructionWrapper = styled.div`
  font-size: 12px;
  margin-top: 24px;
`;
