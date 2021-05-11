import { useEffect, useState } from "react";

import { checkPwaInstalled } from "../utils/appCheck";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWA = () => {
  const [prompt, setState] = useState<IBeforeInstallPromptEvent | null>(null);
  const [isInstalled] = useState(checkPwaInstalled());

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    const handleAppInstalled = (e: Event) => {
      e.preventDefault();
      setState(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as any
    );

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as any
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return { prompt, promptToInstall, isInstalled };
};
