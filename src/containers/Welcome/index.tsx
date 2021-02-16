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
        <Place
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="輸入地址"
        />
      </ContentWrapper>
      <ActionWrapper>
        {place === "" ? (
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
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #fff;
  padding-bottom: 40px;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
`;
