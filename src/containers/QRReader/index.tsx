import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getVenueName, qrDecode } from "../../utils/qr";
import qrOverlay from "../../assets/qrOverlay.svg";
import { QRCodeReader } from "../../components/QRCodeReader";
import { QRCode } from "jsqr";
import { isEmpty, trim } from "ramda";
import { Header } from "../../components/Header";
import {
  travelRecordInputType,
  travelRecordType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";

const QRReader = () => {
  const [qrResult, setQrResult] = useState<string | null>(null);
  const browserHistory = useHistory();
  const { createTravelRecord } = useTravelRecord();

  const handleScan = ({ data }: QRCode) => {
    if (!data || isEmpty(data)) return;
    const decodedJson = qrDecode(data);
    if (!decodedJson) return;

    setQrResult(data);
  };

  useEffect(() => {
    if (!qrResult) return;
    const decodedJson = qrDecode(qrResult);
    if (!decodedJson || !getVenueName(decodedJson)) return;
    createTravelRecord({
      venueId: decodedJson.venueId,
      nameZh: trim(decodedJson.nameZh),
      nameEn: trim(decodedJson.nameEn),
      type: travelRecordType.PLACE,
      inputType: travelRecordInputType.SCAN,
      inTime: dayjs().toISOString(),
    });

    browserHistory.push({ pathname: "/confirm" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrResult, browserHistory]);

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

export default QRReader;

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
