import { Button } from "@material-ui/core";
import { head } from "ramda";
import React from "react";
import styled from "styled-components";

import { Header } from "../../components/Header";
import {
  travelRecordInputType,
  travelRecordType,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { Confirm } from "../Confirm";

type Props = {
  confirmPageIcon?: string | null;
  setConfirmPageIcon: (base64: string | null) => void;
};

const ConfirmPageIconSetting = ({
  confirmPageIcon,
  setConfirmPageIcon,
}: Props) => {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const img = head(files);
    if (!img) {
      setConfirmPageIcon(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => setConfirmPageIcon(String(reader.result));
    }
  };

  return (
    <PageWrapper>
      <Header backPath="/" name="確認頁標誌" />
      <ContentWrapper>
        <StyledInputWrapper>
          <div>自定Icon</div>
          <StyledFileInput
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleFileSelected}
          />
        </StyledInputWrapper>
        {confirmPageIcon && (
          <Actions>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setConfirmPageIcon(null);
              }}
              disabled={!confirmPageIcon}
            >
              移除Icon
            </Button>
          </Actions>
        )}
        <PreviewPageWrapper>
          <Confirm
            confirmPageIcon={confirmPageIcon}
            currentTravelRecord={{
              nameEn: "測試地點",
              type: travelRecordType.PLACE,
              inputType: travelRecordInputType.MANUALLY,
              inTime: dayjs().toISOString(),
            }}
            readOnly
          />
        </PreviewPageWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ConfirmPageIconSetting;

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

const StyledInputWrapper = styled.div`
  font-size: 12px;
  padding: 4px;
  color: rgba(0, 0, 0, 0.54);
`;

const StyledFileInput = styled.input`
  padding: 4px 0;
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const PreviewPageWrapper = styled.div`
  background-color: #12b188;
  margin-top: 20px;
  height: 100vh;
  width: 100vw;
  transform: scale(0.7);
  transform-origin: 50% 0;
`;
