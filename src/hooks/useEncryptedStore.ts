import { AES, enc } from "crypto-js";
import { isNil } from "ramda";
import { useCallback, useMemo, useState } from "react";
import { useDeepCompareEffect, useLocalStorage } from "react-use";

const encryptValue = (input: string, password: string) =>
  AES.encrypt(input, password).toString();

const decryptValue = (input: string, password: string) =>
  AES.decrypt(input, password).toString(enc.Utf8);

export const useEncryptedStore = <T extends T[] | Object>({
  key,
  defaultValue: fallbackValue,
  passthroughOnly = false,
}: {
  key: string;
  defaultValue: T;
  passthroughOnly?: boolean;
}) => {
  const [incognito, setIncognito] = useLocalStorage("incognito", false);
  const [defaultValue] = useState<T>(fallbackValue);

  const [password, setPassword] = useState<string | null>(null);
  const [savedValue, setSavedValue, removeSavedValue] = useLocalStorage<string>(
    key,
    passthroughOnly
      ? undefined
      : password
      ? encryptValue(JSON.stringify(defaultValue), password)
      : JSON.stringify(defaultValue)
  );

  const isEncrypted = useMemo(() => {
    try {
      if (!savedValue) return false;
      JSON.parse(savedValue);
    } catch (e) {
      return true;
    }
    return false;
  }, [savedValue]);

  const [decryptedValue, setDecryptedValue] = useState<T>(
    !isEncrypted && savedValue ? JSON.parse(savedValue) : defaultValue
  );

  const [unlocked, setUnlocked] = useState(!isEncrypted);

  useDeepCompareEffect(() => {
    if (!unlocked || incognito || passthroughOnly) return;
    if (isEncrypted && !password) return;
    const value = JSON.stringify(decryptedValue);
    console.log(value);
    setSavedValue(password ? encryptValue(value, password) : value);
  }, [decryptedValue]);

  const initPassword = useCallback(
    (newPassword: string) => {
      if (isEncrypted || passthroughOnly) return;
      const data = encryptValue(
        savedValue || JSON.stringify(defaultValue),
        newPassword
      );
      setSavedValue(data);
      setPassword(newPassword);
    },
    [passthroughOnly, savedValue, setSavedValue, defaultValue, isEncrypted]
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
        setUnlocked(true);

        return true;
      } catch (e) {
        return false;
      }
    },
    [defaultValue, savedValue, isEncrypted]
  );

  const lockStore = useCallback(() => {
    if (!isEncrypted) return;
    setUnlocked(false);
    setPassword(null);
    setDecryptedValue(defaultValue);
  }, [isEncrypted, defaultValue]);

  return {
    isEncrypted,
    unlockStore,
    lockStore,
    value: decryptedValue,
    setValue: setDecryptedValue,
    initPassword,
    unlocked,
    incognito,
    setIncognito,
    password,
    destroy: removeSavedValue,
    hasData: !isNil(savedValue),
  };
};
