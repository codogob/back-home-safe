export const checkPwaInstalled = () => {
  const isInstalled =
    window.matchMedia("(display-mode: standalone)").matches ||
    /\bmode=standalone\b/.test(window.location.hash) ||
    window.location.hostname === "localhost";

  return isInstalled;
};
