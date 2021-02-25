import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { isEmpty, isNil } from "ramda";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { MediaStream } from "../../components/MediaStream";
import { useCamera } from "../../hooks/useCamera";

export const CameraSetting = () => {
  const { preferredCameraId, setPreferredCameraId, cameraList } = useCamera();

  return (
    <PageWrapper>
      <Header backPath="/" name="相機設定" />
      <FormWrapper>
        <StyledFormControl>
          <InputLabel id="cameraId">相機選擇</InputLabel>
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
        </StyledFormControl>
      </FormWrapper>
      <VideoContainer>
        <MediaStream suppressError />
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
