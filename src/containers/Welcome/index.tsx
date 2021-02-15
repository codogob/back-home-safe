import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Place } from "../../components/Place";

type Props = {
  place: string;
  setPlace: (input: string) => void;
};

export const Welcome = ({ place, setPlace }: Props) => {
  useEffect(() => {
    setPlace("");
  }, [setPlace]);

  const isPWA = useMemo(
    () => window.matchMedia("(display-mode: standalone)").matches,
    []
  );

  return (
    <>
      {!isPWA && (
        <Message>
          <div>要新增至主畫面先似返個App架</div>
          <div>{"IOS: 用Safari開=>分享=>新增至主畫面"}</div>
          <div>{"Android: 用Chrome開=>右上選項=>新增至主畫面"}</div>
        </Message>
      )}
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
          <Button disabled>話去就去!</Button>
        ) : (
          <Link to="/confirm">
            <Button>話去就去!</Button>
          </Link>
        )}
        <StyledLink to="/qr">掃瞄二維碼</StyledLink>
      </ActionWrapper>
    </>
  );
};

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

const Message = styled.div`
  color: #ffffff;
  text-align: center;
  position: absolute;
  width: 100%;
  padding: 8px 0;
`;
