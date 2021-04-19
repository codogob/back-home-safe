import { AES, enc } from "crypto-js";
import { isNil } from "ramda";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDeepCompareEffect, useLocalStorage } from "react-use";

const encryptValue = (input: string, password: string) =>
  AES.encrypt(input, password).toString();

const decryptValue = (input: string, password: string) =>
  AES.decrypt(input, password).toString(enc.Utf8);

export const useEncryptedStore = <T extends T[] | Object>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}) => {
  const [password, setPassword] = useState<string | null>(null);

  const [savedValue, setSavedValue] = useLocalStorage<string>(
    key,
    password
      ? encryptValue(JSON.stringify(defaultValue), password)
      : JSON.stringify(defaultValue)
  );

  const [, , removePasswordHash] = useLocalStorage<string | null>(
    "password_hash",
    null
  );

  useEffect(() => {
    // Old version store password with SHA256, which can be brute-forced
    removePasswordHash();
  }, [removePasswordHash]);

  const [decryptedValue, setDecryptedValue] = useState<T>(defaultValue);

  const isEncrypted = useMemo(() => {
    try {
      if (!savedValue) return false;
      JSON.parse(savedValue);
    } catch (e) {
      return true;
    }
    return false;
  }, [savedValue]);

  const unlocked = useMemo(() => (isEncrypted ? !isNil(password) : true), [
    password,
    isEncrypted,
  ]);

  useDeepCompareEffect(() => {
    if (!unlocked) return;
    setSavedValue(
      password
        ? encryptValue(JSON.stringify(decryptedValue || defaultValue), password)
        : JSON.stringify(decryptedValue)
    );
  }, [decryptedValue, password, defaultValue, setSavedValue, unlocked]);

  const initPassword = useCallback(
    (newPassword: string) => {
      const data = encryptValue(
        savedValue || JSON.stringify(defaultValue),
        newPassword
      );
      setSavedValue(data);
      setPassword(newPassword);
    },
    [savedValue, setSavedValue, defaultValue]
  );

  const unlockStore = useCallback(
    (password: string) => {
      if (!isEncrypted) return true;
      try {
        const decryptedValue = decryptValue(
          savedValue || JSON.stringify(defaultValue),
          password
        );
        setDecryptedValue(JSON.parse(decryptedValue));
        setPassword(password);

        return true;
      } catch (e) {
        return false;
      }
    },
    [defaultValue, savedValue, isEncrypted]
  );

  const lockStore = useCallback(() => {
    if (!isEncrypted) return;
    setPassword(null);
    setDecryptedValue(defaultValue);
  }, [isEncrypted, defaultValue]);

  return {
    unlockStore,
    lockStore,
    value: decryptedValue,
    setValue: setDecryptedValue,
    initPassword,
    unlocked,
  };
};
