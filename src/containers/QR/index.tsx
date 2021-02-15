import React from "react";
import { Link, useHistory } from "react-router-dom";
import Scanner from "react-webcam-qr-scanner";
import styled from "styled-components";
import back from "../../assets/back.svg";
import { qrDecode } from "../../utils/qrDecode";
import qrOverlay from "../../assets/qrOverlay.svg";

type Props = {
  setPlace: (input: string) => void;
};

export const QR = ({ setPlace }: Props) => {
  const browserHistory = useHistory();

  const handleScan = ({ data }: { data: string }) => {
    if (!data) return;
    const place = qrDecode(data);
    if (place !== "") {
      setPlace(place);
      browserHistory.push("/confirm");
    }
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
        <StyledScanner
          onDecode={handleScan}
          constraints={{
            audio: false,
            video: {
              facingMode: "environment",
            },
          }}
        />
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
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledScanner = styled(Scanner)`
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
