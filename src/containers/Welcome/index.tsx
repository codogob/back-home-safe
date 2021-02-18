import { isEmpty } from "ramda";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ConfirmButton } from "../../components/Button";
import { Place } from "../../components/Place";

export const Welcome = () => {
  const [place, setPlace] = useState("");

  return (
    <PageWrapper>
      <ContentWrapper>
        <Msg>我想去</Msg>
        <Place value={place} onChange={setPlace} placeholder="輸入地址" />
      </ContentWrapper>
      <ActionWrapper>
        {isEmpty(place) ? (
          <ConfirmButton disabled shadowed>
            話去就去!
          </ConfirmButton>
        ) : (
          <Link to={{ pathname: "/confirm", search: `?place=${place}` }}>
            <ConfirmButton shadowed>話去就去!</ConfirmButton>
          </Link>
        )}
        <StyledLink to="/qr">掃瞄二維碼</StyledLink>
      </ActionWrapper>
    </PageWrapper>
  );
};

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
  padding: 40px 0;
  flex-shrink: 0;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
`;
