import deleteAllCookiesFactory from "delete-all-cookies";

export const clearAllData = () => {
  deleteAllCookiesFactory(window)();
  window.sessionStorage.clear();
  window.localStorage.clear();
  window.location.reload();
};
