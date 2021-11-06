export enum mediaStreamErrorType {
  GET_USER_MEDIA_NOT_FOUND = "GET_USER_MEDIA_NOT_FOUND",
  CAMERA_ACTIVATE_ERROR = "CAMERA_ACTIVATE_ERROR",
}

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
      console.error(e);
      throw new Error(mediaStreamErrorType.CAMERA_ACTIVATE_ERROR);
    }
  } else {
    throw new Error(mediaStreamErrorType.GET_USER_MEDIA_NOT_FOUND);
  }
};
