import { any } from "ramda";
import { useLocalStorage } from "react-use";
import constate from "constate";
import { useCallback, useEffect, useState } from "react";

export const [UseCameraProvider, useCamera] = constate(() => {
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

  return {
    cameraId: !any(({ deviceId }) => deviceId === cameraId, cameraList || [])
      ? "AUTO"
      : cameraId,
    cameraList: cameraList || [],
    setCameraId,
  };
});
