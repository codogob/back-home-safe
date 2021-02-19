export const getMediaStream = async () => {
  if ("mediaDevices" in navigator) {
    try {
      // WebRTC adapter will polyfill this
      return navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
    } catch (e) {
      alert("Unable to activate camera.\n\n" + e);
      return null;
    }
  } else {
    alert("getUserMedia is not implemented in this browser");
    return null;
  }
};
