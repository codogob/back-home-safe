import { AES, enc, SHA256 } from "crypto-js";
import { useCallback, useMemo, useState } from "react";
import { useLocalStorage as useLS } from "react-use";
import constate from "constate";
import { isNil } from "ramda";

const defaultTravelRecord = JSON.stringify([]);

const encryptTravelRecord = (input: string, password: string) =>
  AES.encrypt(input, password).toString();

const decryptTravelRecord = (input: string, password: string) =>
  AES.decrypt(input, password).toString(enc.Utf8);

export const [UseLocalStorageProvider, useLocalStorage] = constate(() => {
  const [password, setPassword] = useState<string | null>(null);

  const [preferredCameraId, setPreferredCameraId] = useLS(
    "preferred_camera_id",
    "AUTO"
  );

  const [finishedTutorial, setFinishedTutorial] = useLS(
    "finished_tutorial",
    false
  );

  const [passwordHash, setPasswordHash] = useLS<string | null>(
    "password_hash",
    null
  );

  const { unlocked, hasPassword } = useMemo(
    () => ({
      hasPassword: !isNil(passwordHash),
      unlocked: passwordHash ? !isNil(passwordHash) && !isNil(password) : true,
    }),
    [passwordHash, password]
  );

  const [savedTravelRecord, setSavedTravelRecord] = useLS<string>(
    "travel_record",
    hasPassword && password
      ? encryptTravelRecord(defaultTravelRecord, password)
      : defaultTravelRecord
  );

  const travelRecord = useMemo(() => {
    if (hasPassword && !unlocked) return defaultTravelRecord;
    if (hasPassword && unlocked)
      return savedTravelRecord && password
        ? decryptTravelRecord(savedTravelRecord, password)
        : defaultTravelRecord;
    return savedTravelRecord;
  }, [hasPassword, unlocked, password, savedTravelRecord]);

  const setTravelRecord = useCallback(
    (input) => {
      if (hasPassword && !unlocked) return;
      else if (hasPassword && unlocked) {
        const data = password ? encryptTravelRecord(input, password) : input;
        setSavedTravelRecord(data);
      } else {
        setSavedTravelRecord(input);
      }
    },
    [hasPassword, unlocked, password, setSavedTravelRecord]
  );

  const initPassword = useCallback(
    (newPassword: string) => {
      const data = encryptTravelRecord(
        savedTravelRecord || defaultTravelRecord,
        newPassword
      );
      setPasswordHash(SHA256(newPassword).toString());
      setSavedTravelRecord(data);
      setPassword(newPassword);
    },
    [savedTravelRecord, setSavedTravelRecord, setPasswordHash]
  );

  const login = useCallback(
    (password: string) => {
      const computedHash = SHA256(password).toString();
      if (computedHash !== passwordHash) return false;
      setPassword(password);
      return true;
    },
    [passwordHash]
  );

  const logout = useCallback(() => {
    setPassword(null);
  }, []);

  return {
    preferredCameraId,
    setPreferredCameraId,
    finishedTutorial,
    setFinishedTutorial,
    travelRecord,
    setTravelRecord,
    initPassword,
    unlocked,
    setPassword,
    passwordHash,
    setPasswordHash,
    hasPassword,
    login,
    logout,
  };
});
