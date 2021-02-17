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
    <>
      <Header>
        <Link to="/">
          <BackButton src={back} />
        </Link>
        掃瞄二維碼
      </Header>
      <Overlay />
      <Message>掃瞄二維碼</Message>
      <VideoContainer>
        <QRCodeReader onDecode={handleScan} />
      </VideoContainer>
    </>
  );
};

const BackButton = styled.img`
  height: 20px;
  top: 14px;
  left: 16px;
  position: absolute;
`;

const Header = styled.div`
  width: 100%;
  position: absolute;
  z-index: 100;
  color: #ffffff;
  background-color: #12b188;
  text-align: center;
  line-height: 48px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  bottom: 25%;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`;
