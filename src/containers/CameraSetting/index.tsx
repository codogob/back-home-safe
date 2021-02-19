import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { any } from "ramda";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { MediaStream } from "../../components/MediaStream";

export const CameraSetting = () => {
  const [cameraId, setCameraId] = useLocalStorage(
    "preferred_camera_id",
    "AUTO"
  );
  const [cameraList, setCameraList] = useState<InputDeviceInfo[] | null>(null);

  const initCameraList = useCallback(async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();

      const cameraList = deviceList.filter<InputDeviceInfo>(
        (device): device is InputDeviceInfo => device.kind === "videoinput"
      );

      setCameraList(cameraList);
    } catch (e) {
      alert("Unable to list device.\n\n" + e);
    }
  }, []);

  useEffect(() => {
    initCameraList();
  }, [initCameraList]);

  useEffect(() => {
    if (
      cameraList !== null &&
      cameraId !== "AUTO" &&
      !any(({ deviceId }) => deviceId === cameraId, cameraList)
    ) {
      setCameraId("AUTO");
    }
  }, [cameraList, setCameraId, cameraId]);

  return (
    <PageWrapper>
      <Header backPath="/" name="相機設定" />
      <FormWrapper>
        <StyledFormControl>
          <InputLabel id="cameraId">相機選擇</InputLabel>
          <Select
            labelId="cameraId"
            id="demo-simple-select"
            value={cameraId}
            onChange={(e) => {
              setCameraId((e.target.value as string) || "AUTO");
            }}
          >
            <MenuItem value="AUTO">自動</MenuItem>
            {(cameraList || []).map(({ deviceId, label }) => (
              <MenuItem value={deviceId} key="deviceId">
                {label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </FormWrapper>
      <VideoContainer>
        <MediaStream cameraId={cameraId} />
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
