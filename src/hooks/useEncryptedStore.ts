import { AES, enc } from "crypto-js";
import { useCallback, useMemo, useState } from "react";
import { useLocalStorage, useMount, useUpdateEffect } from "react-use";

const encryptValue = (input: string, password: string) =>
  AES.encrypt(input, password).toString();

const decryptValue = (input: string, password: string) =>
  AES.decrypt(input, password).toString(enc.Utf8);

export const useEncryptedStore = <T extends T[] | Object>({
  key,
  defaultValue: fallbackValue,
}: {
  key: string;
  defaultValue: T;
}) => {
  const [incognito, setIncognito] = useLocalStorage("incognito", false);
  const [defaultValue] = useState<T>(fallbackValue);

  const [password, setPassword] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [savedValue, setSavedValue] = useLocalStorage<string>(
    key,
    password
      ? encryptValue(JSON.stringify(defaultValue), password)
      : JSON.stringify(defaultValue)
  );

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

  useMount(() => {
    if (!isEncrypted) {
      setDecryptedValue(savedValue ? JSON.parse(savedValue) : defaultValue);
      setUnlocked(true);
    }
  });

  useUpdateEffect(() => {
    if (!unlocked || incognito) return;
    if (isEncrypted && !password) return;
    const value = JSON.stringify(decryptedValue);
    setSavedValue(password ? encryptValue(value, password) : value);
  }, [decryptedValue]);

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
  };
};
