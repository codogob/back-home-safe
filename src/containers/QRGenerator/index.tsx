import {
  Button,
  ButtonGroup,
  Divider,
  FormGroup,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import QrCodeWithLogo from "qrcode-with-logos";
import { head } from "ramda";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetState } from "react-use";
import styled from "styled-components";

import baseIcon from "../../assets/baseIcon.png";
import { Header } from "../../components/Header";
import { EnhancedEncodeParam, qrEncode } from "../../utils/qr";
import { QRPreview } from "./QRPreview";

const QRGenerator = () => {
  const { t } = useTranslation("qr_generator");
  const imgRef = useRef<HTMLImageElement>(null);
  const fileFieldRef = React.useRef<HTMLInputElement>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [qrCode, setQrCode] = useState<QrCodeWithLogo | null>(null);
  const [state, setState] = useSetState<EnhancedEncodeParam>({
    typeEn: "Stores/Shopping Malls",
    typeZh: "商店/商場",
    nameEn: "CityWalk",
    nameZh: "荃新天地",
    type: "IMPORT",
    venueCode: "0",
    venueID: "WHBvLDSa",
    addressEn: "1 & 18 Yeung Uk Rd, Tsuen Wan, Hong Kong",
    addressZh: "荃灣楊屋道1號",
    customImg: null,
  });

  const isVenueCodeValid = state.venueCode.length === 1;
  const isVenueIdValid = state.venueID.length === 8;

  const isValidData = isVenueCodeValid && isVenueIdValid;

  useEffect(() => {
    if (!imgRef.current || !isValidData) return;
    const encodedString = qrEncode(state);

    const qrCode = new QrCodeWithLogo({
      image: imgRef.current,
      content: encodedString,
      width: 380,
      logo: {
        src: state.customImg || baseIcon,
        logoRadius: 8,
        borderSize: 0,
      },
    });

    qrCode.toImage();
    setQrCode(qrCode);
  }, [state, isValidData]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const img = head(files);
    if (!img) {
      setState({ customImg: null });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => setState({ customImg: String(reader.result) });
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;
    qrCode.downloadImage("QR Code");
  };

  return (
    <PageWrapper>
      <Header backPath="/" name={t("name")} />
      <ContentWrapper id="scroll">
        <StyledForm>
          <StyledTextField
            label={t("form.typeZh")}
            value={state.typeZh}
            onChange={(e) => {
              setState({ typeZh: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.typeEn")}
            value={state.typeEn}
            onChange={(e) => {
              setState({ typeEn: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.nameZh")}
            value={state.nameZh}
            onChange={(e) => {
              setState({ nameZh: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.nameEn")}
            value={state.nameEn}
            onChange={(e) => {
              setState({ nameEn: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.addressZh")}
            value={state.addressZh}
            onChange={(e) => {
              setState({ addressZh: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.addressEn")}
            value={state.addressEn}
            onChange={(e) => {
              setState({ addressEn: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.type")}
            value={state.type}
            onChange={(e) => {
              setState({ type: e.target.value });
            }}
          />
          <StyledTextField
            label={t("form.venue_code")}
            value={state.venueCode}
            onChange={(e) => {
              setState({ venueCode: e.target.value });
            }}
            error={!isVenueCodeValid}
            inputProps={{
              maxLength: 1,
            }}
          />
          <StyledTextField
            label={t("form.venue_id")}
            value={state.venueID}
            onChange={(e) => {
              setState({ venueID: e.target.value });
            }}
            error={!isVenueIdValid}
            inputProps={{
              maxLength: 8,
            }}
          />
          <StyledInputWrapper>
            <div>{t("form.custom_icon")}</div>
            <StyledFileInput
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={fileFieldRef}
              onChange={handleFileSelected}
            />
          </StyledInputWrapper>
        </StyledForm>
        <Divider />
        <Actions>
          <ButtonGroup aria-label="outlined primary button group">
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleDownload}
              disabled={!isValidData}
            >
              {t("global:button.save")}
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => {
                setShowPreview(true);
              }}
              disabled={!isValidData}
            >
              {t("global:button.preview")}
            </Button>
          </ButtonGroup>
        </Actions>
        <StyledQrCode ref={imgRef} alt="qrCode" />
      </ContentWrapper>
      {showPreview && (
        <QRPreview
          data={state}
          onLeave={() => {
            setShowPreview(false);
          }}
        />
      )}
    </PageWrapper>
  );
};

export default QRGenerator;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const StyledForm = styled(FormGroup)`
  padding: 8px 16px;
`;

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    margin-top: 8px;
  }
`;

const StyledInputWrapper = styled.div`
  font-size: 12px;
  padding: 4px 0;
  color: rgba(0, 0, 0, 0.54);
`;

const StyledFileInput = styled.input`
  padding: 4px 0;
`;

const StyledQrCode = styled.img`
  width: 100%;
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;
