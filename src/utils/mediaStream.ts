import { isIOS } from "react-device-detect";

export const getMediaStream = async (
  cameraId?: string,
  suppressError = false
) => {
  if ("mediaDevices" in navigator) {
    try {
      // WebRTC adapter will polyfill this
      return navigator.mediaDevices.getUserMedia({
        video: cameraId
          ? { deviceId: cameraId }
          : { facingMode: "environment" },
        audio: false,
      });
    } catch (e) {
      !suppressError && alert("未能開啟相機鏡頭，請到相機設定進行設置");
      console.log(e);
      return null;
    }
  } else {
    !suppressError &&
      alert(
        isIOS
          ? "getUserMedia is not implemented in this browser, 請確保裝置在IOS 14或以上"
          : "getUserMedia is not implemented in this browser"
      );
    return null;
  }
};
