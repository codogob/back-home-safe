import { Divider } from "@material-ui/core";
import { isEmpty, trim } from "ramda";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ConfirmButton } from "../../components/Button";
import { Place } from "../../components/Place";
import { useCamera } from "../../hooks/useCamera";

const Welcome = () => {
  const { hasCameraSupport } = useCamera();
  const [place, setPlace] = useState("");

  return (
    <PageWrapper>
      <ContentWrapper>
        <Msg>我想去</Msg>
        <Place value={place} onChange={setPlace} placeholder="輸入地址" />
      </ContentWrapper>
      <ActionWrapper>
        {isEmpty(trim(place)) ? (
          <ConfirmButton disabled shadowed>
            話去就去!
          </ConfirmButton>
        ) : (
          <Link to={{ pathname: "/confirm", search: `?place=${place}` }}>
            <ConfirmButton shadowed>話去就去!</ConfirmButton>
          </Link>
        )}
        {hasCameraSupport && (
          <LinkWrapper>
            <StyledLink to="/qrReader">掃瞄二維碼</StyledLink>
            <StyledDivider orientation="vertical" flexItem />
            <StyledLink to="/cameraSetting">相機設定</StyledLink>
          </LinkWrapper>
        )}
        <LinkWrapper>
          <StyledLink to="/qrGenerator">生成二維碼</StyledLink>
        </LinkWrapper>
      </ActionWrapper>
    </PageWrapper>
  );
};

export default Welcome;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Msg = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
`;

const ActionWrapper = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 32px 0;
  flex-shrink: 0;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
`;

const StyledDivider = styled(Divider)`
  margin: 0 8px;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);

  &.MuiDivider-root {
    background-color: #fff;
  }
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  padding: 0 16px;
`;
