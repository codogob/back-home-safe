import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import back from "../../assets/back.svg";
import { qrDecode } from "../../utils/qrDecode";
import qrOverlay from "../../assets/qrOverlay.svg";
import { QRCodeReader } from "../../components/QRCodeReader";
import { QRCode } from "jsqr";
import { isEmpty } from "ramda";

export const QR = () => {
  const browserHistory = useHistory();

  const handleScan = ({ data }: QRCode) => {
    if (!data || isEmpty(data)) return;
    const place = qrDecode(data);
    if (isEmpty(place)) return;
    browserHistory.push({ pathname: "/confirm", search: `?place=${place}` });
  };

  return (
    <PageWrapper>
      <Header>
        <Link to="/">
          <BackButton src={back} />
        </Link>
        掃瞄二維碼
      </Header>
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

const BackButton = styled.img`
  height: 20px;
  top: 14px;
  left: 16px;
  position: absolute;
`;

const Header = styled.div`
  color: #ffffff;
  background-color: #12b188;
  text-align: center;
  line-height: 48px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  flex-shrink: 0;
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
