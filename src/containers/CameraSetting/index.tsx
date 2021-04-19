import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Header } from "../../components/Header";
import { MediaStream } from "../../components/MediaStream";
import { useCamera } from "../../hooks/useCamera";

const CameraSetting = () => {
  const { t } = useTranslation("camera_setting");
  const { preferredCameraId, setPreferredCameraId, cameraList } = useCamera();

  return (
    <PageWrapper>
      <Header backPath="/" name={t("name")} />
      <FormWrapper>
        <StyledFormControl>
          <InputLabel id="cameraId">{t("form.camera_choice.label")}</InputLabel>
          <Select
            labelId="cameraId"
            id="demo-simple-select"
            value={preferredCameraId}
            onChange={(e) => {
              setPreferredCameraId((e.target.value as string) || "AUTO");
            }}
          >
            <MenuItem value="AUTO">自動</MenuItem>
            {cameraList.map(({ deviceId, label }) => (
              <MenuItem value={deviceId} key="deviceId">
                {isNil(label) || isEmpty(label) ? deviceId : label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{t("form.camera_choice.explain")}</FormHelperText>
        </StyledFormControl>
      </FormWrapper>
      <VideoContainer>
        <MediaStream suppressError />
      </VideoContainer>
    </PageWrapper>
  );
};

export default CameraSetting;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;

  &.MuiFormControl-root {
    margin: 8px;
  }
`;
