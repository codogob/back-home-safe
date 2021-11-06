import QrCodeWithLogo from "qrcode-with-logos";
import { isEmpty } from "ramda";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import baseIcon from "../../assets/baseIcon.png";
import cross from "../../assets/cross.svg";
import { Place } from "../../components/Place";
import { EnhancedEncodeParam, qrEncode } from "../../utils/qr";

type Props = {
  data: EnhancedEncodeParam;
  onLeave: () => void;
};

export const QRPreview = ({ data, onLeave }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const encodedString = qrEncode(data);

    new QrCodeWithLogo({
      image: imgRef.current,
      content: encodedString,
      width: 380,
      logo: {
        src: data.customImg || baseIcon,
        logoRadius: 8,
        borderSize: 0,
      },
    }).toImage();
  }, [data]);

  return data ? (
    <PageWrapper>
      <Header>
        <Cross src={cross} onClick={onLeave} />
      </Header>
      <MessageWrapper>
        <PlaceWrapper>
          {data.nameEn && !isEmpty(data.nameZh) && (
            <StyledPlace value={data.nameZh || ""} readOnly />
          )}
          {data.nameEn && !isEmpty(data.nameEn) && (
            <StyledPlace value={data.nameEn || ""} readOnly />
          )}
        </PlaceWrapper>
      </MessageWrapper>
      <TickWrapper>
        <TickWrapperInner>
          <StyledQrCode ref={imgRef} alt="qrCode" />
        </TickWrapperInner>
      </TickWrapper>
      <Address>
        {data.addressZh && !isEmpty(data.addressZh) && (
          <div>{data.addressZh}</div>
        )}
        {data.addressEn && !isEmpty(data.addressEn) && (
          <div>{data.addressEn}</div>
        )}
      </Address>
    </PageWrapper>
  ) : (
    <></>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #12b188;
  position: absolute;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const Cross = styled.img`
  height: 20px;
  margin: 24px;
`;

const StyledPlace = styled(Place)`
  font-size: 20px;
  line-height: 20px;
  text-shadow: none;
`;

const PlaceWrapper = styled.div`
  padding: 0 32px;
`;

const MessageWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TickWrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const TickWrapperInner = styled.div`
  height: 100%;
  max-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledQrCode = styled.img`
  display: inline-block;
  height: 100%;
  max-height: 300px;
  margin: 0 auto;
`;

const Address = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
`;
