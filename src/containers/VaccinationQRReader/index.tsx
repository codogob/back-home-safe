import { QRCode } from "jsqr";
import { isEmpty } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import qrOverlay from "../../assets/qrOverlay.svg";
import { Header } from "../../components/Header";
import { QRCodeReader } from "../../components/QRCodeReader";
import { qrDecode } from "../../utils/vaccinationQRHelper";

const VaccinationQRReader = () => {
  const { t } = useTranslation("vaccination_qr_reader");

  const handleScan = async ({ data }: QRCode) => {
    if (!data || isEmpty(data)) return;
    const decodedJson = await qrDecode(data);
    if (!decodedJson) return;

    console.log(data, decodedJson);
  };

  return (
    <PageWrapper>
      <Header backPath="/" name={t("name")} />
      <Message>{t("message.scan_qr_code")}</Message>
      <VideoContainer>
        <Overlay />
        <QRCodeReader onDecode={handleScan} />
      </VideoContainer>
    </PageWrapper>
  );
};

export default VaccinationQRReader;

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
