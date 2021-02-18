import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getVenueName } from "../../utils/qr";
import qrOverlay from "../../assets/qrOverlay.svg";
import { QRCodeReader } from "../../components/QRCodeReader";
import { QRCode } from "jsqr";
import { isEmpty } from "ramda";
import { Header } from "../../components/Header";

export const QRReader = () => {
  const browserHistory = useHistory();

  const handleScan = ({ data }: QRCode) => {
    if (!data || isEmpty(data)) return;
    const place = getVenueName(data);
    if (isEmpty(place)) return;
    browserHistory.push({ pathname: "/confirm", search: `?place=${place}` });
  };

  return (
    <PageWrapper>
      <Header backPath="/" name="掃瞄二維碼" />
      <Message>掃瞄二維碼</Message>
      <VideoContainer>
        <Overlay />
        <QRCodeReader onDecode={handleScan} />
      </VideoContainer>
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

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Overlay = styled.div`
  /* The image used */
  background-image: url("${qrOverlay}");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  z-index: 50;
  position: relative;
`;

const Message = styled.div`
  position: absolute;
  z-index: 51;
  bottom: 20%;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`;
