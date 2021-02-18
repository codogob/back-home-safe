import {
  Button,
  ButtonGroup,
  Divider,
  FormGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSetState, useMount } from "react-use";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { EnhancedEncodeParam, qrEncode } from "../../utils/qr";
import QrCodeWithLogo from "qrcode-with-logos";
import baseIcon from "../../assets/baseIcon.png";
import { head } from "ramda";
import { disableBodyScroll } from "body-scroll-lock";
import SaveIcon from "@material-ui/icons/Save";
import { QRPreview } from "./QRPreview";

export const QRGenerator = () => {
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

  useMount(() => {
    const root = document.querySelector("#scroll");
    if (!root) return;
    disableBodyScroll(root);
  });

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
      <Header backPath="/" name="生成二維碼" />
      <ContentWrapper id="scroll">
        <StyledForm>
          <TextField
            label="場所種類(中文) (typeZh)"
            value={state.typeZh}
            onChange={(e) => {
              setState({ typeZh: e.target.value });
            }}
          />
          <TextField
            label="場所種類(英文) (typeEn)"
            value={state.typeEn}
            onChange={(e) => {
              setState({ typeEn: e.target.value });
            }}
          />
          <TextField
            label="場所名字(中文) (nameZh)"
            value={state.nameZh}
            onChange={(e) => {
              setState({ nameZh: e.target.value });
            }}
          />
          <TextField
            label="場所名字(英文) (nameEn)"
            value={state.nameEn}
            onChange={(e) => {
              setState({ nameEn: e.target.value });
            }}
          />
          <TextField
            label="場所地址(中文) (預覽用)"
            value={state.addressZh}
            onChange={(e) => {
              setState({ addressZh: e.target.value });
            }}
          />
          <TextField
            label="場所地址(英文) (預覽用)"
            value={state.addressEn}
            onChange={(e) => {
              setState({ addressEn: e.target.value });
            }}
          />
          <TextField
            label="類型"
            value={state.type}
            onChange={(e) => {
              setState({ type: e.target.value });
            }}
          />
          <TextField
            label="場地編碼 (唔知唔好搞)"
            value={state.venueCode}
            onChange={(e) => {
              setState({ venueCode: e.target.value });
            }}
            error={!isVenueCodeValid}
            inputProps={{
              maxLength: 1,
            }}
          />
          <TextField
            label="場地ID (唔知唔好搞)"
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
            <div>自定Icon</div>
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
              儲存
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
              預覽
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

const StyledInputWrapper = styled.div`
  font-size: 12px;
  padding: 4px 0;
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
