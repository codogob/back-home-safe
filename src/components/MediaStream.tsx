import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRafLoop } from "react-use";
import { getMediaStream, mediaStreamErrorType } from "../utils/mediaStream";
import { useCamera } from "../hooks/useCamera";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

type Props = {
  onFrame?: (imageData: ImageData) => void;
  suppressError?: boolean;
};

export const MediaStream = ({ onFrame, suppressError = false }: Props) => {
  const { preferredCameraId } = useCamera();
  const [showUnSupportErrorModal, setShowUnSupportErrorModal] = useState(false);
  const [
    showCameraActivationErrorModal,
    setShowCameraActivationErrorModal,
  ] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loopStop, loopStart] = useRafLoop(() => {
    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;

    if (
      canvasElement &&
      videoElement &&
      videoElement.readyState === videoElement.HAVE_ENOUGH_DATA
    ) {
      const canvas = canvasElement.getContext("2d");
      if (!canvas) return;

      canvasElement.height = videoElement.videoHeight;
      canvasElement.width = videoElement.videoWidth;
      canvas.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      onFrame && onFrame(imageData);
    }
  }, false);

  const initMediaStream = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    console.log("preferredCameraId", preferredCameraId);

    try {
      const stream = await getMediaStream(
        preferredCameraId === "AUTO" ? undefined : preferredCameraId
      );

      if (!stream) return;
      videoElement.srcObject = stream;
      videoElement.play();
      loopStart();
    } catch (e) {
      switch (e.message) {
        case mediaStreamErrorType.GET_USER_MEDIA_NOT_FOUND:
          setShowUnSupportErrorModal(true);
          break;
        case mediaStreamErrorType.CAMERA_ACTIVATE_ERROR:
          if (suppressError) return;
          setShowCameraActivationErrorModal(true);
          break;
        default:
          console.log(e);
      }
    }
  }, [loopStart, preferredCameraId, suppressError]);

  useEffect(() => {
    const videoElement = videoRef.current;
    initMediaStream();

    return () => {
      loopStop();
      if (videoElement) {
        const stream = videoElement.srcObject as MediaStream | null;
        if (!stream) return;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        videoElement.srcObject = null;
      }
    };
  }, [loopStart, loopStop, videoRef, initMediaStream, preferredCameraId]);

  return (
    <>
      <Video ref={videoRef} playsInline />
      <Canvas ref={canvasRef} />
      <Dialog
        open={showUnSupportErrorModal}
        keepMounted
        aria-labelledby="unsupported-device-title"
        aria-describedby="unsupported-device-description"
      >
        <DialogTitle id="unsupported-device-title">不支援的裝置</DialogTitle>
        <DialogContent>
          <DialogContentText id="unsupported-device-description">
            此裝置不支援 getUserMedia API
            {isIOS && <p>請確保裝置在IOS 14或以上</p>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary">回到主頁</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showCameraActivationErrorModal}
        keepMounted
        aria-labelledby="camera-activation-title"
        aria-describedby="camera-activation-description"
      >
        <DialogTitle id="camera-activation-title">未能開啟相機鏡頭</DialogTitle>
        <DialogContent>
          <DialogContentText id="camera-activation-description">
            未能開啟相機鏡頭，請到相機設定進行設置
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary">回到主頁</Button>
          </Link>
          <Link to="/cameraSetting">
            <Button color="primary">相機設定</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Video = styled.video`
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

const Canvas = styled.canvas`
  display: none;
`;
