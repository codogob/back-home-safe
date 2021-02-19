
export const getMediaStream = async (cameraId?: string) => {
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
      console.log(e);
      return null;
    }
  } else {
    alert("getUserMedia is not implemented in this browser");
    return null;
  }
};
