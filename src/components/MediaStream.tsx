import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRafLoop } from "react-use";
import { getMediaStream } from "../utils/mediaStram";

type Props = {
  onFrame: (imageData: ImageData) => void;
};

export const MediaStream = ({ onFrame }: Props) => {
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

      onFrame(imageData);
    }
  }, false);

  const initMediaStream = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const stream = await getMediaStream();
    if (!stream) return;

    videoElement.srcObject = stream;
    videoElement.play();
    loopStart();
  }, [loopStart]);

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
  }, [loopStart, loopStop, videoRef, initMediaStream]);

  return (
    <>
      <Video ref={videoRef} playsInline />
      <Canvas ref={canvasRef} />
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
